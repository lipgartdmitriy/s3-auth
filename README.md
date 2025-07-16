## Description

It is a simple demo file management application that enables users to upload, manage, and store files in Amazon S3 buckets. The application features user authentication, ensuring that each user can only access and manage their own files.

### Features

- User authentication
- File uploads to Amazon S3
- Per-user file management
- Database updates using migrations
- Custom decorators
- Validation pipes

### Tech Stack

- **Backend Framework**: NestJS
- **Database**: PostgreSQL
- **ORM**: MikroORM
- **Authentication**: JWT-based authentication
- **Storage**: Amazon S3
- **Containerization**: Docker

## Project setup

```bash
$ npm install
```

## Running the app

1. Add `.env` file to root directory.

2. Add environment variables from `.env.example` file to `.env` file.

3. Run containers

```bash
$ docker compose up
```

4. Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```
