# Docker-Compose

Docker Compose is a tool for defining and running multi-container Docker applications. It is used for setting up and configuring applications made up of multiple containers. With Docker Compose, you can define the services, networks, and volumes that make up your application in a single YAML file, and then start and stop all services using a single command. This makes it easier to manage and deploy applications composed of multiple containers, and helps ensure consistency and reproducibility of the application environment. Additionally, Docker Compose integrates seamlessly with other Docker tools and services, allowing you to build, test, and deploy multi-container applications with ease.

**Expectation**: Run all services simultaneously with a common **Docker-Compose** file.

## Steps

-   Install **Docker** & **Docker-Compose**.

-   Clone [User](https://github.com/ELEVATE-Project/user/tree/dsep-hackathon), [Mentoring](https://github.com/ELEVATE-Project/mentoring/tree/dsep-hackathon) , [Notification](https://github.com/ELEVATE-Project/notification/tree/dsep-hackathon), [BPP](https://github.com/ELEVATE-Project/mentoring-bpp-service) and [BPP catalog](https://github.com/ELEVATE-Project/mentoring-bpp-catalog-service) services.

-   Create an .env file in all the services. See the .env sample for reference.

-   To create/start all containers:

    ```bash
    ELEVATE/dockerCompose$ docker-compose up
    ```

-   To remove all containers & networks:

    ```bash
    ELEVATE/dockerCompose$ docker-compose down
    ```

    Refer **Docker-Compose README** for more information.
    **Note:** It isn't always necessary to run **down** command. Existing containers and networks can be stopped gracefully by using **Ctrl + C** key combination.
    **Warning:** Do not use docker-compose in production.
