<div align="center">

# Mentoring BPP Service

<a href="https://shikshalokam.org/elevate/">
<img
    src="https://shikshalokam.org/wp-content/uploads/2021/06/elevate-logo.png"
    height="140"
    width="300"
  />
</a>

</br>
The Mentoring building block enables effective mentoring interactions between mentors and mentees. The capability aims to create a transparent eco-system to learn, connect, solve, and share within communities.MentorED is an open source mentoring application that facilitates peer learning and professional development by creating a community of mentors and mentees.

</div>

# Setup Options

Mentoring BPP service can be setup in local using two methods:

<details><summary>Dockerized service with local dependencies (Intermediate)</summary>

## A. Dockerized Service With Local Dependencies

**Expectation**: Run single docker containerized service with existing local (in host) or remote dependencies.

-   Clone the **Mentoring BPP service** repository.

    ```console
    git clone https://github.com/ELEVATE-Project/mentoring-bpp-service.git
    ```

### Local Dependencies Steps

1.  Update dependency (Mongo, Kafka etc) IP addresses in .env with "**host.docker.internal**".

    Eg:

    ```properties
    #MongoDb Connectivity Url
    MONGODB_URL = mongodb://host.docker.internal:27017/dsep-mentoring
    #Kafka Host Server URL
    KAFKA_URL = host.docker.external:9092
    #Mentoring service URI
    MENTORING_URI= host.docker.external:3000/mentoring
    ```

2.  Build the docker image.
    ```console
    /ELEVATE/mentoring-bpp-service$ docker build -t elevate/mentoring-bpp:1.0 .
    ```
3.  Run the docker container.

    -   For Mac & Windows with docker v18.03+:

        ```console
        $ docker run --name mentoring-bpp:1.0 elevate/mentoring-bpp:1.0
        ```

    -   For Linux:

        ```console
        $ docker run --name mentoring-bpp --add-host=host.docker.internal:host-gateway elevate/mentoring-bpp:1.0`
        ```

        Refer [this](https://stackoverflow.com/a/24326540) for more information.

### Remote Dependencies Steps

1.  Update dependency (Mongo, Kafka etc) Ip addresses in .env with respective remote server IPs.

    Eg:

    ```properties
    #Elastic Search Server URL
    ELASTIC_NODE = 10.1.2.34:9200
    #Kafka Host Server URL
    KAFKA_URL = 11.2.3.45:9092
    #Mentoring service URI
    MENTORING_URI= dev.elevate-apis.shikshalokam.org/mentoring
    ```

2.  Build the docker image.
    ```console
    /ELEVATE/mentoring-bpp-service$ docker build -t elevate/mentoring-bpp:1.0 .
    ```
3.  Run the docker container.

    ```console
    $ docker run --name elevate/mentoring-bpp:1.0 elevate/mentoring-bpp:1.0 .
    ```

</details>

<details><summary>Local Service with local dependencies(Hardest)</summary>

## B. Local Service With Local Dependencies

**Expectation**: Run a single service with existing local dependencies in the host (**Non-Docker Implementation**).

### Steps

1.  Install required tools & dependencies

    Install any IDE (eg: VScode)

    Install Nodejs: https://nodejs.org/en/download/

    Install Kafka: https://kafka.apache.org/quickstart

    Install MongoDB: https://docs.mongodb.com/manual/installation/

    Install Robo-3T: ​​ https://robomongo.org/

2.  Clone the **Mentoring BPP service** repository.

    ```console
    git clone https://github.com/ELEVATE-Project/mentoring-bpp-catalog-service.git
    ```

3.  Add **.env** file to the project directory

        Create a **.env** file in **src** directory of the project and copy these environment variables into it.

    ```properties
    APPLICATION_PORT=3005
    NODE_ENV = development
    BECKN_BG_URI=https://gateway.becknprotocol.io/bg
    BECKN_REGISTRY_URI=https://registry.becknprotocol.io/subscribers
    CITY=std:080
    COUNTRY=IND
    DOMAIN=nic2004:85491
    BPP_ID=bpp:3005
    BPP_URI=http://bpp:3005/bpp-2
    REDIS_HOST = redis://redis:6379
    ROOT_ROUTE=/bpp-2
    BPP_NAME="SL BPP #2"
    BPP_CODE="sl-bpp-2"
    BPP_SYMBOL="<i class="fas fa-user-graduate"></i>"
    SUBSCRIBER_ID='bpp12345'
    UNIQUE_ID='sl23rws98uf09s8u'
    PRIVATE_KEY=']//=='
    PUBLIC_KEY='+/='
    AUTH_ENABLED=false
    DISABLE_PROXY_AUTH=true
    BPP_CATALOG_URI='http://bpp-catalog:3009/bpp-catalog'
    MONGODB_URL=mongodb://mongo:27017/dsep-mentoring
    MENTORING_INTERNAL_ACCESS_TOKEN=Fgn1xT7pmCK9PSxVt7yr
    MENTORING_URI='http://mentoring:3000/mentoring'
    BPP_TTL='PT10M'
    SCHEMA_CORE_VERSION='1.0.0'
    ON_CONFIRM_ACTION='on_confirm'
    ON_CONFIRM_ROUTE='/on_confirm'
    ON_SELECT_ACTION='on_select'
    ON_SELECT_ROUTE='/on_select'
    CATALOG_GET_FULFILLMENT_ROUTE='/get-fulfillment/:fulfillmentId'
    CATALOG_GET_SESSION_ROUTE='/get-session/:sessionId'
    MENTORING_SESSION_ENROLL_ROUTE='/v1/sessions/enroll'

    ```

4.  Install Npm packages

    ```console
    ELEVATE/mentoring-bpp-service/src$ npm install
    ```

5.  Start Mentoring server

    ```console
    ELEVATE/mentoring-bpp-service/src$ npm start
    ```

</details>

</br>

# Tech stack

-   Node - 16.0.0
-   Kafka - 7.3.0
-   Mongo - 4.1.2

# Team

<a href="https://github.com/ELEVATE-Project/mentoring-bpp-catalog-service/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=ELEVATE-Project/mentoring-bpp-service" />
</a>

# Open Source Dependencies

Several open source dependencies that have aided Mentoring's development:

![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Apache Kafka](https://img.shields.io/badge/Apache%20Kafka-000?style=for-the-badge&logo=apachekafka)
![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white)
![ElasticSearch](https://img.shields.io/badge/-ElasticSearch-005571?style=for-the-badge&logo=elasticsearch)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
