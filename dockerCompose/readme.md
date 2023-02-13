# Docker-Compose

Docker Compose is a tool for defining and running multi-container Docker applications. It is used for setting up and configuring applications made up of multiple containers. With Docker Compose, you can define the services, networks, and volumes that make up your application in a single YAML file, and then start and stop all services using a single command. This makes it easier to manage and deploy applications composed of multiple containers, and helps ensure consistency and reproducibility of the application environment. Additionally, Docker Compose integrates seamlessly with other Docker tools and services, allowing you to build, test, and deploy multi-container applications with ease.

**Expectation**: Run all services simultaneously with a common **Docker-Compose** file.

## Steps

-   Install **Docker** & **Docker-Compose**.

-   Clone [User](https://github.com/ELEVATE-Project/user/tree/dsep-hackathon), [Mentoring](https://github.com/ELEVATE-Project/mentoring/tree/dsep-hackathon) , [Notification](https://github.com/ELEVATE-Project/notification/tree/dsep-hackathon), [BPP](https://github.com/ELEVATE-Project/mentoring-bpp-service/tree/dsep-hackathon) and [BPP Catalog](https://github.com/ELEVATE-Project/mentoring-bpp-catalog-service/tree/dsep-hackathon) services into this directory structure:

    ```
    ./
    ├── mentoring
    ├── mentoring-bpp-catalog-service
    ├── mentoring-bpp-service
    ├── notification
    └── user

    ```

    Consider this directory as the root director for further steps.

-   Create an .env file in src directory of all the services.

    <details>
    <summary>BPP</summary>

    ```
    APPLICATION_PORT=3005
    NODE_ENV = development
    BECKN_BG_URI=https://gateway.becknprotocol.io/bg
    BECKN_REGISTRY_URI=https://registry.becknprotocol.io/subscribers
    CITY=std:080
    COUNTRY=IND
    DOMAIN=dsep:mentoring
    BPP_ID=bpp:3005
    BPP_URI=http://bpp:3005/bpp-2
    REDIS_HOST = redis://redis:6379
    ROOT_ROUTE=/bpp-2
    BPP_NAME="SL BPP #2"
    BPP_CODE="sl-bpp-2"
    BPP_SYMBOL="<i class="fas fa-user-graduate"></i>"
    SUBSCRIBER_ID=<Beckn Registry BPP Subscriber Id>
    UNIQUE_ID='sl23rws98uf09s8u'
    PRIVATE_KEY=<Beckn Registry Private Key>
    PUBLIC_KEY=<Beckn Registry Public Key>
    AUTH_ENABLED=false
    DISABLE_PROXY_AUTH=true
    BPP_CATALOG_URI='http://bpp-catalog:3009/bpp-catalog'
    MONGODB_URL=mongodb://mongo:27017/dsep-mentoring
    MENTORING_INTERNAL_ACCESS_TOKEN=as97d6fa98s076df987as676as7fd
    MENTORING_URI='http://mentoring:3000/mentoring'
    BPP_TTL='PT10M'
    SCHEMA_CORE_VERSION='1.0.0'
    ON_CONFIRM_ACTION='on_confirm'
    ON_CONFIRM_ROUTE='/on_confirm'
    ON_SELECT_ACTION='on_select'
    ON_SELECT_ROUTE='/on_select'
    ON_STATUS_ACTION='on_status'
    ON_STATUS_ROUTE='/on_status'
    ON_CANCEL_ACTION='on_cancel'
    ON_CANCEL_ROUTE='/on_cancel'
    ON_SEARCH_ACTION='on_search'
    ON_SEARCH_ROUTE='/on_search'
    ON_INIT_ACTION='on_init'
    ON_INIT_ROUTE='/on_init'

    CATALOG_GET_FULFILLMENT_ROUTE='/get-fulfillment/:fulfillmentId'
    CATALOG_GET_SESSION_ROUTE='/get-session/:sessionId'
    CATALOG_GET_STATUS_BODY_ROUTE='/get-status-body/:sessionId/:fulfillmentId'
    MENTORING_SESSION_ENROLL_ROUTE='/v1/sessions/enroll'
    MENTORING_SESSION_UNENROLL_ROUTE='/v1/sessions/unEnroll'
    CATALOG_SEARCH_ROUTE='/search'

    BPP_SHORT_DESCRIPTION='The official dev DSEP BPP Of ShikshaLokam.'
    BPP_LONG_DESCRIPTION="ShikshaLokam's dev BPP act as the provider platform for enabling discovery of mentorship sessions on DSEP open-network."
    BPP_IMAGE='https://shikshalokam.org/wp-content/uploads/2021/06/elevate-logo.png'
    BPP_IMAGE_TYPE='md'
    BPP_IMAGE_WIDTH='400'
    BPP_IMAGE_HEIGHT='200'
    SHOULD_SIGN_CALLBACK_REQUESTS='true'

    ```

    </details>
    <details>
    <summary>BPP Catalog</summary>

    ```
    APPLICATION_PORT=3009
    NODE_ENV=development

    KAFKA_CLIENT_ID='MENTORING_BPP_CATALOG'
    KAFKA_BROKERS='kafka:9092'
    KAFKA_SESSION_TOPIC='session'
    KAFKA_SESSION_ELASTIC_TOPIC='mentoring-sessions'
    KAFKA_PROVIDER_ELASTIC_TOPIC='mentoring-providers'
    KAFKA_FULFILLMENT_ELASTIC_TOPIC='mentoring-fulfillments'
    KAFKA_AGENT_ELASTIC_TOPIC='mentoring-agents'

    ELASTIC_SESSION_INDEX='mentoring-sessions'
    ELASTIC_PROVIDER_INDEX='mentoring-providers'
    ELASTIC_FULFILLMENT_INDEX='mentoring-fulfillments'
    ELASTIC_AGENT_INDEX='mentoring-agents'
    ROOT_ROUTE='/bpp-catalog'

    ELASTIC_NODE='http://elasticsearch:9200'
    KAFKA_CONNECT_URI='http://localhost:8083'

    KAFKA_CONNECT_SESSION_CONNECTOR='mentoring-sessions'
    KAFKA_CONNECT_PROVIDER_CONNECTOR='mentoring-providers'
    KAFKA_CONNECT_FULFILLMENT_CONNECTOR='mentoring-fulfillments'
    KAFKA_CONNECT_AGENT_CONNECTOR='mentoring-agents'

    ```

    </details>
    <details>
    <summary>Mentoring</summary>

    ```

    # Mentoring Service Config

    # Port on which service runs
    APPLICATION_PORT = 3000

    #Service environment
    APPLICATION_ENV = development

    #Route after base url
    APPLICATION_BASE_URL = /mentoring/

    #Mongo db connectivity url
    MONGODB_URL = mongodb://localhost:27017/elevate-mentoring

    #Token secret to verify the access token
    ACCESS_TOKEN_SECRET = 'bsj82AHBxahusub12yexlashsbxAXADHBlaj'

    # Internal access token for communicationcation between services via network call
    INTERNAL_ACCESS_TOKEN = 'as97d6fa98s076df987as676as7fd'

    # Kafka hosted server url
    KAFKA_URL = localhost:9092

    # Kafka group to which consumer belongs
    KAFKA_GROUP_ID = userservice

    # Kafka topic to push notification data
    NOTIFICATION_KAFKA_TOPIC = notificationtopic

    # Kafka topic name to consume from mentoring topic
    KAFKA_MENTORING_TOPIC ="mentoringtopic"

    # Kafka topic to push recording data
    KAFKA_RECORDING_TOPIC ="recordingtopic"

    SESSION_KAFKA_TOPIC='session'

    # Any one of three features available for cloud storage
    CLOUD_STORAGE = 'GCP/AWS/AZURE'

    # Gcp json config file path
    GCP_PATH = 'gcp.json'

    # Gcp bucket name which stores files
    DEFAULT_GCP_BUCKET_NAME = 'gcp-bucket-storage-name'

    # Gcp project id
    GCP_PROJECT_ID = 'project-id'

    # Aws access key id
    AWS_ACCESS_KEY_ID = 'aws-access-key-id'

    # Aws secret access key
    AWS_SECRET_ACCESS_KEY = 'aws-secret-access-key'

    # Aws region where bucket will be located
    AWS_BUCKET_REGION = 'ap-south-1'

    # Aws end point
    AWS_BUCKET_ENDPOINT = 's3.ap-south-1.amazonaws.com'

    # Aws bucket name which stores files
    DEFAULT_AWS_BUCKET_NAME = 'aws-bucket-storage-name'

    # Azure storage account name
    AZURE_ACCOUNT_NAME = 'account-name'

    # Azure storage account key
    AZURE_ACCOUNT_KEY = 'azure-account-key'

    # Azure storage container which stores files
    DEFAULT_AZURE_CONTAINER_NAME = 'azure-container-storage-name'

    #user serice host
    USER_SERIVCE_HOST = 'http://localhost:3001'

    #user serice base url
    USER_SERIVCE_BASE_URL = '/user/'

    # Big blue button url
    BIG_BLUE_BUTTON_URL = <Url Of BigBlueButton Instance>

    # Big blue button base url
    BIB_BLUE_BUTTON_BASE_URL = /bigbluebutton/

    # Meeting end callback events end point
    MEETING_END_CALLBACK_EVENTS = https%3A%2F%2Fdev.elevate-apis.shikshalokam.org%2Fmentoring%2Fv1%2Fsessions%2Fcompleted

    # Big blue button secret key
    BIG_BLUE_BUTTON_SECRET_KEY = n

    # Big blue button recording ready callback url
    RECORDING_READY_CALLBACK_URL = http%3A%2F%2Flocalhost%3A3000%2F%3FmeetingID%3Dmeet123

    #Enable logging of network request
    ENABLE_LOG = true

    # Api doc url
    API_DOC_URL = '/api-doc'

    #Internal cache expiry time
    INTERNAL_CACHE_EXP_TIME = 86400

    #kafka rating topic
    RATING_KAFKA_TOPIC = 'Rating'

    # Redis Host connectivity url
    REDIS_HOST = redis://redis:6379

    #Kafka internal communication
    CLEAR_INTERNAL_CACHE = 'mentoringInternal'

    #Enable email for reported issue.
    ENABLE_EMAIL_FOR_REPORT_ISSUE = true

    #Email id of the support team.
    SUPPORT_EMAIL_ID = 'support@xyz.com,team@xyz.com'

    #Email template code for reported issue.
    REPORT_ISSUE_EMAIL_TEMPLATE_CODE = 'user_issue_reported'

    #Big blur button logout url
    BIG_BLUE_BUTTON_SESSION_END_URL = 'https%3A%2F%2Fmentoring.shikshalokam.org%2Fsessions%2Fdetails%2F'

    SESSION_KAFKA_TOPIC = 'session'

    ERROR_LOG_LEVEL='1'

    DISABLE_LOG='false'

    APPLICATION_URL='asdfp8asfd8'

    ```

    </details>

    <details>
    <summary>User</summary>

    ```
    #User Service Config

    # Port on which service runs
    APPLICATION_PORT = 3001

    # Service environment
    APPLICATION_ENV = development

    # Database connectivity url
    MONGODB_URL = mongodb://localhost:27017/users

    # Number of rounds for encryption
    SALT_ROUNDS = 10

    # Token secret to generate access token
    ACCESS_TOKEN_SECRET = 'bsj82AHBxahusub12yexlashsbxAXADHBlaj'

    # Token secret to generate refresh token
    REFRESH_TOKEN_SECRET = 'refresh-token-secret'

    # Kafka hosted server url
    KAFKA_URL = localhost:9092

    # Kafka group to which consumer belongs
    KAFKA_GROUP_ID = userservice

    # Kafka topic to consume data from
    KAFKA_TOPIC = 'topic'

    # Kafka topic to push notification data
    NOTIFICATION_KAFKA_TOPIC = notificationtopic

    # Any one of three features available for cloud storage
    CLOUD_STORAGE = AWS

    # Gcp json config file path
    GCP_PATH = 'gcp.json'

    # Gcp bucket name which stores files
    DEFAULT_GCP_BUCKET_NAME = 'gcp-bucket-storage-name'

    # Gcp project id
    GCP_PROJECT_ID = 'project-id'

    # Aws access key id
    AWS_ACCESS_KEY_ID = 'aws-access-key-id'

    # Aws secret access key
    AWS_SECRET_ACCESS_KEY = 'aws-secret-access-key'

    # Aws region where bucket will be located
    AWS_BUCKET_REGION = 'ap-south-1'

    # Aws end point
    AWS_BUCKET_ENDPOINT = 's3.ap-south-1.amazonaws.com'

    # Aws bucket name which stores files
    DEFAULT_AWS_BUCKET_NAME = 'aws-bucket-storage-name'

    # Azure storage account name
    AZURE_ACCOUNT_NAME = 'account-name'

    # Azure storage account key
    AZURE_ACCOUNT_KEY = 'azure-account-key'

    # Azure storage container which stores files
    DEFAULT_AZURE_CONTAINER_NAME = 'azure-container-storage-name'

    # Internal access token for communicationcation between services via network call
    INTERNAL_ACCESS_TOKEN="as97d6fa98s076df987as676as7fd"
    #INTERNAL_ACCESS_TOKEN = 'as97d6fa98s076df987as676as7fd'

    # Mentor screct code for registering
    MENTOR_SECRET_CODE = '4567'

    #Enable logging of network request
    ENABLE_LOG = true

    # JWT Access Token expiry In Days
    ACCESS_TOKEN_EXPIRY = '1'

    # JWT Refresh Token expiry In Days
    REFRESH_TOKEN_EXPIRY = '183'

    # Redis Host connectivity url
    REDIS_HOST = redis://localhost:6379

    # Otp expiration time for forgetpassword or registration process
    OTP_EXP_TIME = 86400

    # Enable email based otp verification for registration process
    ENABLE_EMAIL_OTP_VERIFICATION = false
    APP_NAME=user
    REGISTRATION_EMAIL_TEMPLATE_CODE='test'
    OTP_EMAIL_TEMPLATE_CODE='1234'
    API_DOC_URL = '/api-doc'
    RATING_KAFKA_TOPIC = 'Rating'
    #Internal cache expiry time
    INTERNAL_CACHE_EXP_TIME = 86400
    CLEAR_INTERNAL_CACHE = userInternal
    ENABLE_EMAIL_FOR_REPORT_ISSUE = false

    #Key for email encryption 32 bit string
    KEY = 'g5MQ7HG/r5gPCPQQCwfBBEduAt72ewJIY/gWc0RNoak='

    #IV for email encryption 16 bit string
    IV = '2lIctRkqzYMWbwlW1jCC9A=='

    ERROR_LOG_LEVEL='1'
    DISABLE_LOG='false'
    DEFAULT_ORGANISATION_CODE='org3'
    ```

    </details>

    <details>
    <summary>Notification</summary>

    ```
    # Notification Service Config

    #Port on which service runs
    APPLICATION_PORT = 3002

    #Application environment
    APPLICATION_ENV = development

    #Route after base url
    APPLICATION_BASE_URL = /notification/

    #Kafka endpoint
    KAFKA_HOST = localhost:9092

    #kafka topic name
    KAFKA_TOPIC ="testTopic"

    #kafka consumer group id
    KAFKA_GROUP_ID = "notification"

    #sendgrid api key
    SENDGRID_API_KEY=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

    #sendgrid sender email address
    SENDGRID_FROM_MAIL = "test@gmail.com"

    API_DOC_URL='testURL'
    ```

    </details>

-   Download the docker-compose.yml file from this [directory](https://github.com/ELEVATE-Project/mentoring-bpp-service/tree/dsep-hackathon/dockerCompose) and place it in the root directory as shown below:

    ```
    ./
    ├── docker-compose.yml
    ├── mentoring
    ├── mentoring-bpp-catalog-service
    ├── mentoring-bpp-service
    ├── notification
    └── user

    ```

-   Since elasticsearch is being run as a docker container, virtual memory allocation for docker must be increased.

    Refer the following resources for the same:

    Linux:

    https://www.elastic.co/guide/en/elasticsearch/reference/current/vm-max-map-count.html

    https://stackoverflow.com/questions/42889241/how-to-increase-vm-max-map-count

    Mac & Windows:

    https://www.elastic.co/guide/en/elasticsearch/reference/8.4/docker.html#docker-prod-prerequisites

-   Start the services and dependencies by running the docker-compose up command:

    ```bash
    $ docker-compose up
    ```

-   Once all the services are up and running along with all the dependencies, navigate to scripts directory of mentoring-bpp-catalog service and run the following scripts to generate kafka-connect connector configurations.

    ```bash
    ./mentoring-bpp-catalog-service/src/scripts/kafkaConnectorConfigs$ node createAgentConnector.js  && node createFulfillmentConnector.js && node createProviderConnector.js && node createSessionConnector.js
    ```

-   Then navigate to the src directory of user service and run the following migration commands:

    ```bash
    ./user/src$ npm run elevate-migrations s
    ./user/src$ npm run elevate-migrations up
    ```

-   Now you can start making requests to various services using the postman collections which can be found at /src/api-doc directory in mentoring and user services. BPP postman collection has been shared separately.

-   Additionally api-docs can be generated by running the following command from the src path of mentoring and user services:

    ```bash
    ./src$ redoc-cli build -o ./api-doc/index.html ./api-doc/api-doc.yaml
    ```

-   To remove all containers & networks:

    ```bash
    $ docker-compose down
    ```

    Refer **Docker-Compose README** for more information.
    **Note:** It isn't always necessary to run **down** command. Existing containers and networks can be stopped gracefully by using **Ctrl + C** key combination.
    **Warning:** Do not use docker-compose in production.
