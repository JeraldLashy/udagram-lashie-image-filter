import express from 'express';
import { Router, Request, Response } from 'express';
import bodyParser from 'body-parser';
import {filterImageFromURL, deleteLocalFiles} from './util/util';

(async () => {

  // Init the Express application
  const app = express();

  // Set the network port
  const port = process.env.PORT || 8082;
  
  // Use the body parser middleware for post requests
  app.use(bodyParser.json());

  // Done == @TODO1 IMPLEMENT A RESTFUL ENDPOINT 
  // Done == ET /filteredimage?image_url={{URL}}
  // endpoint to filter an image from a public url.
  // IT SHOULD
  //  
  //DONE    1. validate the image_url query  DONE
  //DONE    2. call filterImageFromURL(image_url) to filter the image   DONE
  //DONE   3. send the resulting file in the response   DONE
  //DONE   4. deletes any files on the server on finish of the response DONE
  // QUERY PARAMATERS
  //    image_url: URL of a publicly accessible image     DONE
  // RETURNS
  //   the filtered image file [!!TIP res.sendFile(filteredpath); might be useful]

  /**************************************************************************** */

  app.get('/filteredImage', async(req: Request, res: Response) =>{

    const image_url = req.query.image_url.toString();

    if(!image_url){
      return res.status(400).send('Please Note that the Image Url is reuired');
    } 
    const filtered_image = await filterImageFromURL(image_url);
    res.status(200).sendFile(filtered_image, () => {deleteLocalFiles([filtered_image])});
    });

  //! END @TODO1
  
  // Root Endpoint
  // Displays a simple message to the user
  app.get( "/", async ( req, res ) => {
    res.send("try GET /filteredimage?image_url={{}}")
  } );
  

  // Start the Server
  app.listen( port, () => {
      console.log( `server running http://localhost:${ port }` );
      console.log( `press CTRL+C to stop server` );
  } );
})();