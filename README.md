# ALX-Chatbot
Don't bother just ask ALX Chatbot is always here with you
<p align="center">
<img src="https://ibb.co/Lv8L6JP" width=100% height=100% />
</p>
Make sure you check out the frontend, backend also datasets before getting started.

- [Problem Statement](#Problem_Statement)
- [Intended Users](#Intended_Users)
- [Technologies](#Technologies)
- [Architecture](#Architecture)
- [Data Modelling](#Data_Modelling)
- [AI Integration](#AI_integration)
- [Get Started](#GetStarted)

# Problem Statement

The alx-Chatbot Project is intended to address the challenge of providing personalized and efficient assistance to ALX students within a specific educational context. ALX students may encounter various queries, concerns, or requests for support related to their learning journey, course materials, or program requirements.
However, the volume of inquiries and the need for timely responses can overwhelm traditional support channels, leading to delays and inefficiencies. Therefore, there's a need for an AI-powered chatbot solution tailored to ALX students, capable of understanding their unique needs and providing relevant information and guidance to enhance their learning experience and overall satisfaction.


# Intended Users

## Current students
Individuals enrolled in the ALX software engineer program seeking assistance, information, or support related to 

their coursework, and projects.

## Alumni
Graduates of ALX software engineer program who may seek 
ongoing support, resources, or networking opportunities to further their careers or professional development.

## Staff and mentors
ALX employees, mentors, and support staff who may use the chatbot as a tool for assisting students, providing guidance, or accessing relevant resources and information.


# Technologies

## Frontend
    - React js
    - Redux (optional)
    - React Router
    - Chakra-UI

## Backend
    - Mode.js with Express js
    - MongoDB with mongoose
    - OpenAI APi

## Authentication and Authorization
    - OAuth 2.0

## Deployment (not yet)
    - Heroku
    - MongoDB Atlas

## Additional Tools and Libraries
    - Git
    - Postman

# Architecture

## Info :

In the first time we think that using `Embedding` Open AI model will be the best idea but we changes our idea into
using `Open AI Assistance model`. This model prevent us from `chunking` files for `Embedding` and also decrease the
`overhead` of using `cosine similarity` calculation and also we can upload more that one dataset file at once.

<p align="center">
    <img src="https://ibb.co/1KHJ0dQ" width=100% height=100% />
</p>

# Data Modelling

<p align="center">
    <img src="https://ibb.co/grcnM8L" width=100% height=100% />
</p>

# AI Integration (to upload after)

## Access OpenAI API
First, you need access to OpenAI's API, which provides access to the GPT models. You'll need to sign up for an API key and follow their documentation for authentication and usage.

## Selecting GPT-4
Ensure that you're using the GPT-4 model specifically when making requests to the API. This may involve specifying the model version in your API requests.

## Prompt Creation
With GPT-4, crafting effective prompts becomes crucial. The prompt is the initial input you provide to the model to generate responses. Design prompts that are clear, concise, and align with the tasks or questions you want the AI assistant to handle.

## Handling Responses
Once you send a prompt to the GPT-4 model via the API, you'll receive a response. You'll need to handle and format this response appropriately based on your application's requirements. This might involve parsing the text, extracting relevant information, and presenting it to the user.

## Data sets
We used ALX concepts pages.

# Get Started

<p align="center">
    <img src="https://ibb.co/KhnXWTS" width=100% height=100% />
</p>

    - Clone the project to your local machine
    - MongoDB API Key 
    - OpenAI API Key
    - Open frontend folder and run `npm install` to install all the dependencies after run `npm start`
    - for the backend do the exact same thing to install dependencies but to run the project run `node index.js`

## We will push AI part latter in this week, for know just enjoy reading !