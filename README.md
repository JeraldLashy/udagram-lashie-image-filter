# Udagram Image Filtering Microservice

Udagram is a simple cloud application developed alongside the Udacity Cloud Engineering Nanodegree. It allows users to register and log into a web client, post photos to the feed, and process photos using an image filtering microservice.

The project is split into three parts:
1. [The Simple Frontend](https://github.com/udacity/cloud-developer/tree/master/course-02/exercises/udacity-c2-frontend)
A basic Ionic client web application which consumes the RestAPI Backend. [Covered in the course]
2. [The RestAPI Backend](https://github.com/udacity/cloud-developer/tree/master/course-02/exercises/udacity-c2-restapi), a Node-Express server which can be deployed to a cloud service. [Covered in the course] Done 
3. [The Image Filtering Microservice](https://github.com/udacity/cloud-developer/tree/master/course-02/project/image-filter-starter-code), the final project for the course. It is a Node-Express application which runs a simple script to process images. [This Project](https://github.com/JeraldLashy/udagram-lashie-image-filter.git)

## Tasks
The tasks to this project was achieved in following manner:


### Set Node Environment

Created a Node Server
Opened a new terminal within the project directory and run:

1.  `npm i` to Initialize a new project
2.  `npm run dev` to run in dev mode

### Create a new endpoint in the server.ts file

Completed the task in The starter code to create an endpoint in `./src/server.ts` which uses query parameter to download an image from a public URL, filter the image, and return the result.

#### Imports

```typescript

```

#### Function TO Filter image


```typescript
app.get('/filteredImage', async(req: Request, res: Response) =>{

    const image_url = req.query.image_url.toString();

    if(!image_url){
      return res.status(400).send('Please Note that the Image Url is reuired');
      //return was used so that function does not proceed if error, exposing a bug here.
    } 
    const filtered_image = await filterImageFromURL(image_url);
    res.status(200).sendFile(filtered_image, () => {deleteLocalFiles([filtered_image])});
    });
```

### Deployment

Elastic Bean was used

`eb init` creates a new app

    Modify the .elasticbeanstalk/config.yml file
    Add deploy:
            artifact: ./www/Archive.zip to achieve the code for deployment

`eb create` creates a  new environment for the app

`eb deploy` used to push changes after deployment from dev local.

### Testing

#### Before Deployment
`npm run dev` to run in dev mode
    Use postman to test the endpoint by giving a link
    E.g
    `http://localhost:8082/filteredimage?image_url=https://zimbabwetourism.net/wp-content/uploads/2021/10/Mukuvisi-Woodlands-3-770x550.jpg`

#### After Deployment

Use Postman to test the endpoint of the elasticbeanstalk app deployed.
    E.g 
    `http://udagram-lashie-image-filter-dev.us-east-1.elasticbeanstalk.com/filteredimage?image_url=https://zimbabwetourism.net/wp-content/uploads/2021/10/Mukuvisi-Woodlands-3-770x550.jpg`

