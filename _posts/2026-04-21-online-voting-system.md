---
title: Online Voting System Project
date: 2026-04-21 11:00:00  +0530
categories:
  - Spring Boot
  - React
  - MySQL
  - Docker
  - Nginx
  - Face API
  - Project Notes
tags:
  - spring-boot
  - react
  - mysql
  - docker
  - nginx
  - face-api
  - project-notes
  - online-voting-system
image:
  path: https://raw.githubusercontent.com/yadnyeshkolte/blog/images/online-voting-system.webp
  lqip: data:image/webp;base64,UklGRpIAAABXRUJQVlA4WAoAAAAQAAAADwAABwAAQUxQSBoAAAABF6CQbQQw/c8yIkJuFHIAgPyS57Y/HAaIaP8pAFZQOCBYAAAAsAEAnQEqEAAIAAVAfCWwAnS6AfgA/vUerLC1CWrHT+dSYXqxTBbnGXiTBWnHmxbOvmgW6TrjcC8jwMzGHMNJ5noS18I1gCJ3Z9OOyIIhgAAA
  alt: Online Voting System application interface
---

This post is **not** written as a public marketing article.

This is my **internal project reference** for the `online-voting-system` repository, prepared after a detailed code and configuration scan on **April 21, 2026**. The goal is simple:

1. understand exactly what is already implemented
2. understand what is incomplete, risky, stale, or inconsistent
3. prepare for interviews by being able to explain the project honestly, deeply, and clearly

If I read only this document before an interview, I should be able to explain the system architecture, the implementation flow, the deployment model, the tradeoffs, the current limitations, and the next improvements without missing important details.

<!--more-->

## Project Links

- **Project Report:** [LinkedIn Project Treasury](https://www.linkedin.com/in/yadnyesh-kolte/overlay/Project/1076482848/treasury/?profileId=ACoAAEaGnMYBdTttmTTbARJTjLxhnJUOjc2Wnx4)
- **Live Deployment:** [onlinevotingsystem.duckdns.org](https://onlinevotingsystem.duckdns.org/)
- **GitHub Repository:** [github.com/yadnyeshkolte/online-voting-system](https://github.com/yadnyeshkolte/online-voting-system)
- **Project Documentation:** [yadnyeshkolte.github.io/online-voting-system](https://yadnyeshkolte.github.io/online-voting-system/)
- **Portfolio:** [yadnyeshkolte.github.io](https://yadnyeshkolte.github.io/)

## Executive Snapshot

This project is a **full-stack online voting platform** with:

- a **React + Vite** frontend
- a **Spring Boot** backend
- a **MySQL** database
- a separate **Node.js face verification microservice**
- **Docker Compose** deployment
- **Nginx**-based frontend serving and reverse proxying
- production-ready support for **HTTPS-based webcam usage**

The system supports:

- voter registration
- identity validation against seeded verification datasets
- JWT-based login
- separate admin and voter flows
- election creation and management
- candidate management
- profile photo upload
- facial verification before vote casting
- one-vote-per-election protection
- result calculation
- result publication on the public homepage

It is already beyond a basic CRUD project. It has real system boundaries, real deployment concerns, and several good engineering decisions.

At the same time, it is **not yet production-grade**. The scan also found concrete issues around authorization, validation, data exposure, documentation drift, test coverage, and configuration hygiene.

## Current Health Check

This is the most important status summary as of the code scan on **April 21, 2026**:

| Area | Status | Notes |
|---|---|---|
| Frontend production build | `PASSING` | `npm run build` completed successfully on April 21, 2026 |
| Backend compilation | `PASSING` | Maven reached test execution successfully |
| Backend automated tests | `FAILING` | `./mvnw test` fails because `app.cors.allowed-origins` is missing in test properties |
| Backend functional depth | `MODERATE` | Core flows exist, but several server-side guardrails are missing |
| Frontend functional depth | `GOOD` | Main admin, voter, and public flows are implemented |
| Documentation consistency | `WEAK` | `TESTING.md`, `docs/finalschema.sql`, and runtime seeding are not fully aligned |
| CI/CD automation | `NOT FOUND` | No CI workflow was found in the repo scan |
| Security posture | `PARTIAL` | JWT, RBAC, HTTPS support, and face verification exist, but secrets/config/DTO boundaries need work |
| Interview value | `HIGH` | Strong enough to discuss architecture, auth, deployment, verification, and debugging in detail |

## Repository Structure

The repo is organized into four main areas:

```text
backend/
  onlinevotingsystem/     -> Spring Boot API
  imageverify/            -> Node.js face verification service

frontend/                 -> React + Vite application
docs/                     -> SQL schema, login/reference docs

docker-compose.yml        -> Multi-service deployment
README.md                 -> Minimal root README
TESTING.md                -> Manual testing notes (partly stale)
summery.md                -> deployment / stabilization report
```

### Important Files I Should Remember

#### Backend Core

- `backend/onlinevotingsystem/src/main/java/com/project/onlinevotingsystem/config/SecurityConfig.java`
- `backend/onlinevotingsystem/src/main/java/com/project/onlinevotingsystem/config/JwtRequestFilter.java`
- `backend/onlinevotingsystem/src/main/java/com/project/onlinevotingsystem/config/JwtUtils.java`
- `backend/onlinevotingsystem/src/main/java/com/project/onlinevotingsystem/service/AuthService.java`
- `backend/onlinevotingsystem/src/main/java/com/project/onlinevotingsystem/service/UserService.java`
- `backend/onlinevotingsystem/src/main/java/com/project/onlinevotingsystem/service/ElectionService.java`
- `backend/onlinevotingsystem/src/main/java/com/project/onlinevotingsystem/service/VoteService.java`
- `backend/onlinevotingsystem/src/main/java/com/project/onlinevotingsystem/service/ProfileImageStorageService.java`
- `backend/onlinevotingsystem/src/main/java/com/project/onlinevotingsystem/service/VerificationService.java`

#### Backend Controllers

- `backend/onlinevotingsystem/src/main/java/com/project/onlinevotingsystem/controller/AuthController.java`
- `backend/onlinevotingsystem/src/main/java/com/project/onlinevotingsystem/controller/UserController.java`
- `backend/onlinevotingsystem/src/main/java/com/project/onlinevotingsystem/controller/UserElectionController.java`
- `backend/onlinevotingsystem/src/main/java/com/project/onlinevotingsystem/controller/AdminElectionController.java`
- `backend/onlinevotingsystem/src/main/java/com/project/onlinevotingsystem/controller/AdminUserController.java`
- `backend/onlinevotingsystem/src/main/java/com/project/onlinevotingsystem/controller/PublicElectionController.java`

#### Frontend Core

- `frontend/src/App.jsx`
- `frontend/src/context/AuthContext.jsx`
- `frontend/src/services/api.js`
- `frontend/src/pages/Login.jsx`
- `frontend/src/pages/AdminLogin.jsx`
- `frontend/src/pages/Register.jsx`
- `frontend/src/pages/UserDashboard.jsx`
- `frontend/src/pages/ProfilePage.jsx`
- `frontend/src/pages/AdminDashboard.jsx`
- `frontend/src/pages/ManageUsers.jsx`

#### Face Verification Service

- `backend/imageverify/server.js`
- `backend/imageverify/package.json`
- `backend/imageverify/Dockerfile`
- `backend/imageverify/.dockerignore`
- `backend/imageverify/download-models.js`

#### Deployment and Config

- `docker-compose.yml`
- `frontend/nginx.conf`
- `frontend/Dockerfile`
- `backend/onlinevotingsystem/Dockerfile`
- `backend/onlinevotingsystem/src/main/resources/application.properties`
- `backend/onlinevotingsystem/src/test/resources/application.properties`

## Technology Stack

### Frontend

- React 19
- Vite 7
- React Router
- Axios
- React Bootstrap + Bootstrap
- react-webcam
- jwt-decode

### Backend

- Spring Boot 4
- Java 17
- Spring Security
- Spring Data JPA
- MySQL Connector
- JWT via `io.jsonwebtoken`
- Lombok
- RestTemplate for internal HTTP integration

### Verification Service

- Node.js 18
- Express
- Multer
- face-api.js
- canvas

### Infra

- Docker Compose
- Nginx
- MySQL 8

## Architecture Overview

This is a **three-application system** rather than a single monolith:

```text
Browser
  |
  v
Frontend (React SPA served by Nginx)
  |
  +--> /api -> Spring Boot backend
                  |
                  +--> MySQL
                  |
                  +--> imageverify service
```

### Why This Split Is Good

This separation gives the project a clean responsibility model:

- the frontend owns UX and route handling
- the Spring backend owns business rules and authorization
- the image verification service owns image matching logic
- MySQL owns persistence

This is one of the strongest architectural decisions in the repo because it keeps the face-recognition concern separate from the election domain.

## Runtime Modes: Important Internal Note

One of the most important things to remember for interviews is that this project currently has **two different setup stories**, and they are not fully aligned.

### Mode 1: Code-First Startup

If the app runs normally using Spring Boot with:

- `spring.jpa.hibernate.ddl-auto=update`
- the current `DataSeeder`

then the system creates schema incrementally and seeds:

- **1 admin**: `admin@voting.com / admin123`
- **1 consistent Aadhar/Voter ID verification pair** for `John Doe / 1990-01-01`

It does **not** automatically seed the large election and user dataset from `docs/finalschema.sql`.

### Mode 2: Manual SQL Seed Mode

If `docs/finalschema.sql` is used manually, the database gets:

- a much larger schema/data population
- many dummy users
- multiple admins
- more elections/candidates/votes/results

### Why This Matters

The current codebase and documentation are partially split across these two worlds. For interview honesty, I should say:

> "The application logic is code-first, but the repo also contains a richer manual SQL dataset used for documentation/demo purposes. One remaining cleanup task is to choose a single canonical setup path."

## Domain Model

The core entities are:

- `User`
- `Admin`
- `Election`
- `Candidate`
- `Vote`
- `VoterElectionStatus`
- `ElectionResult`
- `ElectionReport`
- `DummyAadharRecord`
- `DummyVoterIdRecord`
- `DummyPanRecord`
- `DummyPassportRecord`

### Entity Summary

#### `User`

Stores voter identity and profile data:

- email
- password hash
- full name
- phone
- DOB
- gender
- address, city, state, pincode
- Aadhar number
- voter ID number
- PAN and passport fields
- profile image URL/reference
- `isActive`
- `isVerified`
- audit timestamps

#### `Admin`

Separate admin account model with:

- email
- password hash
- full name
- phone
- activation flag

This separation is good because admin accounts are not overloaded into the user table.

#### `Election`

Stores:

- name
- type
- start and end dates
- city and state
- lifecycle status
- publication status
- metadata for creator and result publisher

#### `Candidate`

Links a user into a particular election and stores:

- party name
- party symbol
- manifesto
- candidate photo as `LONGBLOB`

#### `Vote`

Stores:

- election reference
- voter reference
- candidate reference
- vote hash
- voted timestamp

#### `VoterElectionStatus`

Stores whether a user has voted in a given election.

This is a separate anti-duplicate-vote tracking table in addition to the unique constraint on the `votes` table.

#### `ElectionResult`

Stores:

- vote count
- percentage
- rank

#### `ElectionReport`

Stores:

- total registered voters
- total votes cast
- turnout percentage
- total candidates
- winner
- winning margin
- report metadata

## Authentication and Authorization Model

The auth design is one of the better parts of this project.

### Login Flow

The backend accepts a `LoginRequest` with:

- `identifier`
- `password`

The identifier can resolve differently depending on the role:

- admin login resolves by email
- user login is intended mainly via voter ID
- backend also supports user lookup by email as fallback

### Token Design

The JWT stores:

- subject
- role
- id

That means the frontend can restore auth context and route users immediately to the correct dashboard.

### Protected Route Model

Backend authorization rules are:

- `/api/auth/**` -> public
- `/api/public/**` -> public
- `/api/user/profile/photo/**` -> public
- `/api/admin/**` -> admin only
- `/api/user/**` -> user only

This is a solid base RBAC model.

## Registration and Identity Verification

Registration is not just account creation. It includes a verification step.

### Registration Checks Currently Implemented

- age must be 18+
- email must be unique
- Aadhar number must be unique
- voter ID number must be unique
- Aadhar record must match submitted full name and DOB
- voter ID record must match submitted full name and DOB

### Important Detail

Only **Aadhar and voter ID** are actually used in the verification logic.

The project also contains:

- `dummy_pan_records`
- `dummy_passport_records`

but they are **not currently used** by `VerificationService`. PAN and passport exist in the schema and update flows, but not in the registration verification logic.

That is an important interview answer because it shows the system was designed for more than one proof source, but only partially implemented so far.

## Profile and Media Handling

The profile system lets users:

- view their profile
- edit non-core details
- upload a profile photo
- add PAN and passport later if missing

Important current behavior:

- registration does **not** upload a real profile photo
- newly registered users start with a default profile image reference
- a voter must upload their own profile photo before voting
- `VoteService` explicitly rejects face verification against the default profile image

### Profile Photo Strategy

The project supports a hybrid media strategy:

- local file storage
- remote URL references
- Cloudinary-compatible uploads

`ProfileImageStorageService` resolves the storage mode and handles:

- storing local files
- uploading to Cloudinary
- resolving images for verification
- cleaning up temporary files

### Important Media Difference

The project stores:

- **profile photos** as file path / URL references
- **candidate photos** as raw BLOB data in MySQL

This is a notable design inconsistency, but it is also a useful interview talking point. It shows that two media strategies are being used for two different feature sets.

## Election Management

Admins can:

- create elections
- specify election type
- set dates
- add city/state for local and state elections
- add candidates
- upload candidate photos
- change election status
- calculate results
- publish/unpublish results

### Election Visibility Logic

Election visibility is currently calculated like this:

- `LOCAL`: user city and state must match election city and state
- `STATE`: user state must match election state
- `GENERAL` and `SPECIAL`: visible to all users

This logic exists in `ElectionService.isElectionVisibleToUser(...)`.

### Important Limitation

The visibility logic is used when listing active/completed elections for users, but it is **not consistently enforced on every downstream voter endpoint**. That creates one of the most important gaps found in the scan.

## Voting Flow

The vote-casting flow is:

1. user opens an active election
2. frontend loads candidates
3. frontend captures webcam image using `react-webcam`
4. frontend posts `candidateId + capturedImage`
5. backend checks election status and duplicate-vote state
6. backend verifies that the user has uploaded a non-default profile photo
7. backend resolves the stored profile image
8. backend sends stored and captured images to `imageverify`
9. face verification returns match/non-match
10. backend stores the vote
11. backend updates `VoterElectionStatus`
12. backend recalculates election results

### Duplicate-Vote Protection

The system protects against duplicate voting at two levels:

- application check using `VoterElectionStatus`
- database uniqueness constraint on `(election_id, user_id)` in `votes`

This is a good design decision and worth highlighting in interviews.

## Face Verification Service

The `backend/imageverify` service is the most distinctive feature in the repo.

### Current Implementation

- receives `storedImage` and `capturedImage`
- loads both using `canvas`
- runs `face-api.js`
- extracts landmarks and descriptors
- computes Euclidean distance
- compares distance against threshold
- returns `match` + `distance`

### Threshold

The default threshold is:

- `0.6`

and is configurable through `FACE_MATCH_THRESHOLD`.

### Service Health Model

The service exposes:

- `/health` -> returns `503` until models are loaded, then `200`

This is good operational design because model readiness is treated separately from process start.

## Public Results

The public homepage fetches:

- `/api/public/elections/results`

and displays only **published** election results using DTOs:

- `PublicElectionResultDTO`
- `PublicCandidateResultDTO`

This is good because public exposure is at least partially DTO-based instead of direct entity serialization.

## API Surface Reference

### Auth

| Method | Path | Auth | Purpose |
|---|---|---|---|
| `POST` | `/api/auth/login` | Public | Login for admin or voter |
| `POST` | `/api/auth/register` | Public | Register voter with identity verification |

### User Profile

| Method | Path | Auth | Purpose |
|---|---|---|---|
| `GET` | `/api/user/profile` | User | Get current user profile |
| `PUT` | `/api/user/profile` | User | Update profile |
| `POST` | `/api/user/profile/photo` | User | Upload profile photo |
| `GET` | `/api/user/profile/photo/{filename}` | Public | Serve profile photo or fallback |

### User Elections

| Method | Path | Auth | Purpose |
|---|---|---|---|
| `GET` | `/api/user/elections/active` | User | List visible active elections |
| `GET` | `/api/user/elections/completed` | User | List visible completed elections |
| `GET` | `/api/user/elections/{id}/candidates` | User | Get candidates |
| `POST` | `/api/user/elections/{id}/vote` | User | Cast vote with captured image |
| `GET` | `/api/user/elections/{id}/has-voted` | User | Check current user's vote status |
| `GET` | `/api/user/elections/{id}/results` | User | Get completed election results if visible |
| `GET` | `/api/user/elections/candidates/{candidateId}/photo` | User | Get candidate photo |

### Admin

| Method | Path | Auth | Purpose |
|---|---|---|---|
| `GET` | `/api/admin/elections` | Admin | List all elections |
| `POST` | `/api/admin/elections` | Admin | Create election |
| `PUT` | `/api/admin/elections/{id}/status` | Admin | Update election status |
| `POST` | `/api/admin/elections/{id}/candidates` | Admin | Add candidate to draft election |
| `POST` | `/api/admin/elections/{id}/calculate-results` | Admin | Recalculate results |
| `PUT` | `/api/admin/elections/{id}/publish` | Admin | Publish/unpublish completed result |
| `GET` | `/api/admin/elections/{id}/results` | Admin | Get results |
| `POST` | `/api/admin/elections/{id}/candidates/{candidateId}/photo` | Admin | Upload candidate photo |
| `GET` | `/api/admin/users` | Admin | Search users |
| `PUT` | `/api/admin/users/{userId}` | Admin | Update user |
| `PUT` | `/api/admin/candidates/{candidateId}/image` | Admin | Duplicate candidate image route |

### Public

| Method | Path | Auth | Purpose |
|---|---|---|---|
| `GET` | `/api/public/elections/results` | Public | Get published election results |

## What Is Clearly Done

This is the feature inventory I can confidently say is implemented.

### Core Application

- React SPA with admin, voter, and public flows
- Spring Boot API with role-based route protection
- JWT generation and request filtering
- separate admin and user account handling
- voter registration with identity verification
- user login and admin login paths
- profile viewing and profile editing
- profile photo upload
- election creation from admin UI
- candidate creation inside election creation flow
- candidate photo upload
- election status updates from UI
- active/completed election listing for users
- vote submission with webcam capture
- face verification integration
- vote persistence and duplicate-vote tracking
- result calculation
- result publication toggling
- public published results page

### Deployment

- Dockerfile for backend
- Dockerfile for frontend
- Dockerfile for image verification service
- Docker Compose orchestration
- frontend Nginx config proxying `/api`
- environment-driven configuration
- health check for image verification service

### Operational Improvements Already Present

- imageverify `.dockerignore` blocks `node_modules` from contaminating container builds
- frontend build uses relative `/api` base path for same-domain deployment
- `ProfileImageStorageService` supports future cloud storage
- backend retry exists for transient EOF during image verification call
- candidate results published to public DTOs rather than raw entities

## What Is Partially Done

These areas exist, but they are not fully complete or fully hardened.

### Verification Model

- Aadhar and voter ID verification is active
- PAN/passport tables exist
- PAN/passport update fields exist
- but PAN/passport verification is **not actually enforced**

### Approval / Activation Model

- `User` contains `isActive`, `isVerified`, and `approvedAt`
- `Admin` contains `isActive`
- but there is no real admin approval workflow yet
- and there is no activate/deactivate management flow exposed in the current UI

### Media Strategy

- local file storage works
- Cloudinary-ready code exists
- but the project is still in a mixed storage model

### Testing

- test scaffold exists
- H2 test config exists
- but only one `contextLoads()` test exists
- and that test currently fails

### Documentation

- there is a schema file
- there is a testing file
- there is a summary/deployment report
- but the documentation is not fully synchronized with the current runtime code

## High-Priority Remaining Work

This is the most important section for future implementation.

### P0: Server-Side Authorization and Voting Rule Fixes

These are the biggest real gaps in the current implementation.

#### 1. Enforce election visibility on all voter endpoints

Currently:

- `getActiveElections()` filters visible elections

But these endpoints do **not** consistently enforce that the current user is actually eligible to access the election:

- `/api/user/elections/{id}/candidates`
- `/api/user/elections/{id}/has-voted`
- `/api/user/elections/{id}/vote`

That means a user could potentially access or act on election IDs outside their city/state scope if they know the IDs.

#### 2. Ensure candidate belongs to the election being voted in

`VoteService.castVote(...)` checks:

- election exists
- candidate exists

but it does **not** verify:

- candidate.election.id == election.id

That is a real business-rule bug and should be fixed before claiming the vote path is fully safe.

#### 3. Stop returning raw entities where DTOs should be used

The system still returns entities like `Candidate`, `ElectionResult`, and `User` directly in many places.

That creates a risk of leaking data that should not be exposed, especially nested candidate user data such as:

- Aadhar number
- voter ID number
- address
- DOB
- email

For example, user-facing candidate/result responses likely serialize the nested `User` object more broadly than intended.

### P1: Validation and Contract Hardening

#### 4. Add bean validation annotations

The project includes validation dependencies, but the DTOs do not currently use annotations like:

- `@NotBlank`
- `@Email`
- `@Size`
- `@Valid`

This means most request validation is manual or absent.

#### 5. Validate election creation rules

The backend currently does not strictly validate:

- start date before end date
- required state for `STATE`
- required state and city for `LOCAL`
- sane status transitions

#### 6. Validate edit/update uniqueness

Profile and admin edit flows can update email without pre-checking uniqueness. Right now, duplicate values would fail only at the database level.

### P1: Testing and Documentation

#### 7. Fix the backend test suite

Current failure:

- `./mvnw test` fails because `app.cors.allowed-origins` is missing in `src/test/resources/application.properties`

#### 8. Add real tests

Needed test coverage:

- auth success/failure
- registration verification
- election visibility
- duplicate-vote prevention
- candidate-election mismatch rejection
- profile photo flows
- result publication

#### 9. Reconcile docs with runtime behavior

Current drift:

- `TESTING.md` says Java 21, but `pom.xml` targets Java 17
- `TESTING.md` includes stale dummy verification details
- `docs/finalschema.sql` seeds a richer dataset than runtime seeding
- `DataSeeder` currently seeds only one admin and one consistent verification pair

### P2: Cleanup and Production Hardening

#### 10. Remove or justify unused dependencies

The scan found:

- websocket starter dependencies in Maven
- websocket test dependencies
- no actual websocket implementation in backend or frontend
- `body-parser` in imageverify package, but not used in code

#### 11. Remove duplicate/unused endpoints/helpers

Examples:

- `frontend/src/services/api.js` defines `adminGetCandidates()`, but no matching backend GET endpoint exists
- `AdminUserController` has a duplicate candidate image update route that is not the main path used by the admin UI

#### 12. Improve temp file cleanup in imageverify

The imageverify service deletes uploaded files after successful face detection, but if an exception occurs earlier, the multer temp files may remain.

#### 13. Move away from risky production defaults

Current config concerns:

- `spring.jpa.hibernate.ddl-auto=update`
- `spring.jpa.show-sql=true`
- default secrets present in `docker-compose.yml`

Even for a portfolio project, I should be ready to say these are development conveniences and not production best practice.

## Known Bugs, Risks, and Inconsistencies

This section is especially important for interviews because it shows engineering maturity.

### 1. Election visibility is not enforced everywhere

This is the biggest application-level issue found in the scan.

### 2. Candidate/election cross-check is missing in vote casting

This is a direct business-rule hole.

### 3. Raw entity exposure may leak candidate PII

The public result endpoint uses DTOs, which is good.

But many user/admin endpoints still return full entity graphs.

### 4. PAN and passport are modeled but not truly verified

The schema suggests a richer identity model than what the current code actually enforces.

### 5. Runtime seeding and SQL seeding are not aligned

This creates confusion in local testing and in explaining the project.

### 6. Backend tests are effectively absent

Only one context test exists, and it currently fails.

### 7. Turnout calculation is simplistic

`ElectionService.generateReport(...)` uses:

- `userRepository.count()`

as the number of registered voters for all elections.

That means turnout is not scoped to eligible voters by geography or election type.

### 8. Status transitions are not constrained

The API lets the admin set the election status directly. There is no state-machine enforcement beyond what the UI chooses to expose.

### 9. Result tie handling is not explicitly defined

Ranking is sorted by vote count, but tie behavior is not formally specified.

### 10. No liveness detection

Face comparison exists, but anti-spoof/liveness detection does not.

## Operational Notes

### Frontend Build Status

Verified on **April 21, 2026**:

```bash
npm run build
```

Result:

- build passed successfully
- generated production assets under `frontend/dist`

### Backend Test Status

Verified on **April 21, 2026**:

```bash
./mvnw test
```

Result:

- compilation succeeded
- test execution started
- `contextLoads()` failed

Exact cause:

- missing placeholder: `app.cors.allowed-origins`

That means the test properties do not fully cover the requirements introduced by `SecurityConfig`.

### Hidden Deployment Details Worth Remembering

- frontend container serves static assets and proxies `/api` to backend
- Docker Compose binds frontend to `127.0.0.1:8080`
- imageverify is accessed internally through the Compose network
- browser camera access in production depends on HTTPS, not just correct frontend code

## Short Interview Summary I Can Rehearse

If I need a 60-90 second version:

> "I built a full-stack Online Voting System with React, Spring Boot, MySQL, and a separate Node.js face verification service. The platform supports voter registration with identity validation, JWT-based authentication, role-based admin and voter flows, election creation, candidate management, vote casting with facial verification, and public result publication. I containerized the full stack with Docker Compose and solved deployment issues around HTTPS, reverse proxying, and service health. The strongest parts are the architecture split, duplicate-vote protection, and deployment design. The main remaining work is tightening server-side authorization rules, replacing raw entity responses with DTOs, improving validation and tests, and reconciling documentation and seed data."

## What I Should Say Honestly If Asked "What Is Still Missing?"

I should answer something like this:

> "The core workflows are implemented, but I would not claim it is production-ready yet. The biggest missing work is stricter server-side enforcement of election eligibility on all vote-related endpoints, validating that a candidate belongs to the selected election, reducing entity overexposure through DTOs, adding proper automated tests, and cleaning up configuration/documentation drift between code-first seeding and SQL-based demo data."

## 50 Interview Questions and Detailed Answers

### 1. What problem does this project solve?

This project solves the problem of building a secure and manageable digital voting workflow instead of a paper-based or purely manual system. It supports voter registration, admin-managed election lifecycle, controlled vote casting, and published results. More importantly, it tries to model trust boundaries rather than just storing votes. Registration requires identity validation, voting requires a face match, and results are intentionally published through an admin action instead of becoming public automatically.

### 2. What is the high-level architecture of the project?

The architecture is split into a React frontend, a Spring Boot backend, a MySQL database, and a separate Node.js image verification service. The frontend is the SPA used by admins, voters, and public viewers. The backend owns authentication, business rules, persistence, and cross-service orchestration. The image verification service handles face comparison independently, which keeps biometric processing isolated from core election logic.

### 3. Why did you use React + Vite for the frontend?

React was a good fit because the UI has multiple role-driven workflows, modal-heavy interactions, dashboard behavior, and protected routes. Vite keeps development fast and makes the build setup simpler than older toolchains. The project also benefits from the SPA model because user identity state, JWT handling, route protection, and webcam interactions are all naturally handled client-side. In short, React + Vite gave a fast developer experience and a clean path to a production build.

### 4. Why did you use Spring Boot for the backend?

Spring Boot gave me structured support for security, dependency injection, JPA repositories, request handling, and layered architecture. This project needed clean separation between controllers, services, repositories, and entities, and Spring Boot makes that straightforward. Spring Security was especially important because I needed JWT-based stateless auth and role-based route protection. It also made it easy to integrate MySQL and expose a reasonably clean REST API.

### 5. Why is the image verification logic in a separate Node.js service instead of the Spring Boot app?

I separated it because face detection and descriptor extraction are a different concern from election domain logic. The Node ecosystem is a more natural place to use `face-api.js` and `canvas`, while the Java backend is stronger for business rules, persistence, and authorization. Splitting them reduces coupling and makes debugging easier. It also means I can evolve or replace the verification engine without rewriting the main API.

### 6. How does authentication work end to end?

The frontend sends a login request with `identifier` and `password` to `/api/auth/login`. The backend authenticates using Spring Security, resolves whether the identity belongs to an admin or user, and then generates a JWT containing the role and ID. The frontend stores the token in local storage and decodes it on startup to rebuild auth state. After that, Axios automatically sends the token in the `Authorization` header for protected API calls.

### 7. How are admin and voter accounts separated?

Admins and voters are stored in different tables: `admins` and `users`. Admin login resolves by email, while user login is intended to happen via voter ID, with email fallback supported in the backend. This is better than using a single generic user table with a role column because it keeps the operational model cleaner. Admin accounts are conceptually a different trust boundary from voter records.

### 8. What exactly happens during user registration?

The registration flow checks age, uniqueness of email/Aadhar/voter ID, and then runs identity verification using the submitted full name, date of birth, Aadhar number, and voter ID number. If the data matches the dummy verification records, the user is persisted with a hashed password and marked verified. If no profile image is supplied, a default profile image reference is assigned. This means registration is not just a form insert; it is gated by a verification step.

### 9. How does identity verification work in the current code?

`VerificationService` currently checks two repositories: the dummy Aadhar records and the dummy voter ID records. The user passes verification only if both records match the exact Aadhar or voter ID number, full name, and date of birth, and both records are marked valid. That gives the project a simple but meaningful identity validation layer. It is still dummy-data-based, but the flow is architecturally correct.

### 10. Are PAN and passport actually part of the verification flow?

Not yet. The schema contains `dummy_pan_records` and `dummy_passport_records`, and the user/admin profile update flows contain PAN and passport fields. But the current `VerificationService` only checks Aadhar and voter ID. So the system models PAN/passport, but does not yet use them as active verification sources.

### 11. How is age validation implemented?

Age validation happens in `AuthService.register()`. The backend computes the period between the submitted date of birth and the current date and rejects registration if the user is under 18. The frontend also performs a client-side age check before submission, but the backend is the real enforcement layer. This is a good example of duplicating validation where the frontend improves UX and the backend preserves correctness.

### 12. How are passwords handled?

Passwords are hashed using Spring Security's password encoder configuration before being stored. The system never returns the password hash in API responses because `User.passwordHash` is marked with `@JsonIgnore`. Authentication is then handled through Spring Security and JWT rather than session storage. This is a standard but important security foundation.

### 13. How is JWT used in the system?

After successful login, the backend creates a JWT signed with the configured secret. The token includes role and ID claims, which the frontend uses to decide navigation and route access. On each protected request, the JWT filter extracts the token, validates it, loads the user, and sets the Spring Security context. This enables fully stateless authentication across frontend and backend.

### 14. How are protected routes handled on the frontend?

The frontend uses a custom `PrivateRoute` component along with `AuthContext`. If no user exists, the route redirects to login. If the user role does not match the expected role, the route redirects to the public landing page. This keeps the UI consistent, although the backend still remains the true source of authorization.

### 15. How are elections created and managed?

Admins create elections from the dashboard by providing election name, type, dates, and optionally city/state depending on election type. Candidate metadata can be attached during creation, and candidate images are uploaded afterward using the returned candidate IDs. Admins can then move elections through lifecycle states such as draft, scheduled, active, and completed. They can also calculate results and publish or unpublish them.

### 16. How does the system decide which elections a voter can see?

The logic is implemented in `ElectionService.isElectionVisibleToUser(...)`. Local elections require both city and state to match, state elections require state match, and general or special elections are visible to everyone. This filtering is currently applied when returning active and completed election lists to users. It is a good domain rule, but it is not yet enforced consistently on every related endpoint.

### 17. How are candidates modeled?

A candidate is a link between a `User` and an `Election`, plus election-specific metadata such as party name, party symbol, manifesto, and candidate photo. The database enforces that the same user cannot be added twice as a candidate in the same election. This is a reasonable design because it treats a candidate as a voter/user participating in a particular election context. The candidate photo is currently stored as a BLOB in MySQL.

### 18. Why are candidate photos stored in the database while profile photos are stored as file paths or URLs?

That is one of the inconsistencies in the current design. Candidate photos are stored as raw binary data in `candidate_photo`, while profile photos use a storage service abstraction that supports local files and remote URLs. The likely reason is that candidate images were built as an election-specific upload path, while profile photos were designed later with storage flexibility in mind. In a future cleanup, both should probably move to a common media strategy.

### 19. How does the voter cast a vote?

The frontend opens a modal from the user dashboard, captures a webcam image using `react-webcam`, and sends the image with `candidateId` to the backend as multipart form data. The backend checks election status, duplicate-vote state, and face verification result. If everything succeeds, it persists the vote, updates the voter-election status, and recalculates results. The frontend then refreshes the election state and shows that the user has voted.

### 20. How is duplicate voting prevented?

The project uses a layered strategy. First, `VoterElectionStatus` tracks whether the user has already voted in that election. Second, the `votes` table itself enforces a unique constraint across `(election_id, user_id)`. This means even if two requests race at the application level, the database still protects the integrity of the election.

### 21. What is `VoterElectionStatus` used for if the `votes` table already has a unique constraint?

The unique constraint is the final guard. `VoterElectionStatus` is useful for workflow state and faster "has this user already voted?" checks without needing to infer the state only from the votes table. It also gives the frontend a clean endpoint for checking vote status. In other words, the table improves usability and tracking, while the unique constraint protects correctness.

### 22. How does face verification work technically?

The image verification service loads the stored profile image and the captured live image. It runs face detection and extracts face descriptors using `face-api.js` with `canvas`. Then it computes the Euclidean distance between the descriptors and compares the result to a threshold. If the distance is below the threshold, the service returns a match and the vote can proceed.

### 23. Why is the face verification threshold set to 0.6?

The code uses `0.6` as the default because that is a common baseline for `face-api.js` descriptor comparison. It balances false positives and false negatives reasonably for a demo-grade system. The value is also configurable via environment variable, which is important because thresholds often need tuning based on deployment conditions and image quality. In an interview, I should frame this as a configurable heuristic rather than a magic constant.

### 24. Why did you add a health endpoint to the image verification service?

Because the service is not really ready until the models are fully loaded. A process can be alive but still unusable if the face recognition models are not available yet. The `/health` endpoint returns `503` while models are loading and `200` after readiness. That makes Docker Compose health checks much more meaningful.

### 25. Why does HTTPS matter so much for this project?

The voting flow depends on browser webcam access, and browsers restrict camera APIs to secure contexts such as HTTPS or localhost. That means a feature that works fine on localhost can fail in production if the deployment is plain HTTP. So HTTPS was not just a hosting improvement; it was a functional requirement for the webcam-based verification flow. This was one of the key real-world deployment lessons of the project.

### 26. What role does Nginx play in this project?

There are two Nginx-related roles. Inside the frontend container, Nginx serves the built SPA and proxies `/api` to the backend container. At the host level in production, Nginx can terminate TLS and forward traffic to the frontend container. That separation lets the browser see a secure HTTPS origin while the internal containers communicate over the Compose network.

### 27. What is in `docker-compose.yml`?

It orchestrates four services: MySQL, backend, imageverify, and frontend. It defines environment variables, volumes, network membership, restart policies, and health checks. The frontend is bound to `127.0.0.1:8080`, which is a good pattern when a host-level reverse proxy handles public ingress. It also wires the backend to the image verification service through an internal URL.

### 28. How are results calculated?

Whenever a vote is cast, the backend recalculates results for that election. It counts votes per candidate, stores or updates `ElectionResult` rows, computes percentages, sorts candidates by vote count, assigns rank positions, and generates or updates an `ElectionReport`. This means results are kept in sync as part of the vote workflow rather than requiring a separate offline batch job. The admin can also trigger explicit result calculation from the dashboard.

### 29. What is the difference between `ElectionResult` and `ElectionReport`?

`ElectionResult` stores per-candidate metrics like vote count, percentage, and rank. `ElectionReport` stores aggregate election-level metrics such as total votes cast, turnout percentage, number of candidates, winner, and winning margin. So one is candidate-centric, and the other is election-centric. Together they support both ranking and reporting.

### 30. How are public results exposed safely?

The public homepage uses `/api/public/elections/results`, which returns DTOs rather than raw entities. Those DTOs intentionally expose only public fields such as election name, candidate name, vote count, percentage, and image URL. This is one of the cleaner API boundaries in the project. It is a good example of using DTOs where public exposure really matters.

### 31. What is the biggest authorization gap you found during the scan?

The biggest gap is that election visibility is not enforced on all downstream voter actions. The user list endpoints apply geography filtering, but endpoints for fetching candidates, checking vote status, and casting a vote do not consistently re-check whether the user is allowed to act on that election. If someone can guess an election ID, they may be able to access or submit against elections outside their intended scope. That should be treated as a high-priority fix.

### 32. What is the biggest business-rule bug you found?

`VoteService.castVote(...)` fetches the election and the candidate separately but does not confirm that the candidate actually belongs to that election. That means a malicious or incorrect request could theoretically submit a candidate ID from another election. Even if the frontend only sends correct values, the backend should enforce the relationship. This is exactly the kind of server-side check interviewers like to hear about.

### 33. What data exposure risk exists in the current API design?

Several controllers return JPA entities directly instead of curated DTOs. Because `Candidate` contains a nested `User`, user-facing candidate or result responses may expose fields that should stay private, such as Aadhar number, voter ID number, address, or date of birth. The public results endpoint avoids this by using DTOs, but the rest of the API still needs that cleanup. This is a strong interview answer because it shows I understand that security is also about response shape, not just auth.

### 34. What validation is currently missing?

The project includes validation-related dependencies, but the DTOs do not use bean validation annotations. That means there is no standardized validation on things like required fields, email format, string sizes, date relationships, or nested request objects. Right now many checks are manual or absent. A proper next step would be adding `@Valid` and field-level annotations plus consistent exception mapping.

### 35. What inconsistency exists between the runtime seeder and the SQL schema file?

The runtime `DataSeeder` inserts one admin and one consistent Aadhar/voter ID demo pair. In contrast, `docs/finalschema.sql` contains a much richer dataset with multiple admins, many users, elections, candidates, votes, and reports. This means different setup paths lead to very different application states. For maintainability, the project should eventually pick one canonical seed strategy or clearly separate dev/demo datasets from the runtime path.

### 36. What is wrong with the current test setup?

The backend only has one test: a Spring context load test. That test currently fails because the test properties do not define `app.cors.allowed-origins`, which `SecurityConfig` requires. So the project currently has both low test depth and a failing test suite. From an interview perspective, this is a good example of why config-sensitive integration tests need complete environment setup.

### 37. What documentation inconsistencies did you find?

`TESTING.md` says Java 21 in prerequisites, but `pom.xml` targets Java 17. `TESTING.md` also contains stale dummy verification info that does not match the current consistent demo pair in `DataSeeder`. `docs/finalschema.sql` seeds more data than the runtime code actually inserts. These inconsistencies matter because they make onboarding and demos confusing.

### 38. Are there any unused dependencies or technical debt in the build files?

Yes. The Maven build includes websocket starters and websocket test dependencies, but no websocket implementation was found in the backend or frontend scan. The image verification service includes `body-parser` in `package.json`, but the code does not use it. This is the kind of cleanup debt that does not block functionality but weakens clarity.

### 39. Are there any duplicate or unused endpoints?

Yes. There is a duplicate candidate image update path in `AdminUserController`, while the admin UI actually uses the election-scoped upload route in `AdminElectionController`. Also, the frontend service file contains an `adminGetCandidates()` helper, but no matching backend GET endpoint exists for that exact path. These are signs that the API surface has grown a bit unevenly.

### 40. How is profile image storage designed?

`ProfileImageStorageService` abstracts storage mode so profile images can be stored locally or uploaded to Cloudinary. It also knows how to resolve the stored reference into a concrete file for face verification, even when the reference is a remote URL. That is a strong design choice because it decouples higher-level user logic from the exact media backend. It also makes future migration away from local files easier.

### 41. What is currently risky in the application configuration?

The app uses `spring.jpa.hibernate.ddl-auto=update` and `spring.jpa.show-sql=true`, which are convenient in development but not ideal for production discipline. The compose file also contains default secrets and credentials, which should be externalized and rotated rather than stored as repo defaults. These choices are understandable for a project/demo setup, but they should be called out honestly. They are good examples of "works for development, not best for production."

### 42. What security measures are already present?

The project already has several solid security foundations: password hashing, JWT-based stateless auth, role-based route protection, HTTPS-ready deployment, duplicate-vote protection, identity verification during registration, and face verification during voting. It also restricts public result exposure through an explicit publication flow. So while the system is not fully hardened, it is also not a naive prototype. It has real security thinking in multiple layers.

### 43. What important security features are still missing?

The system does not have liveness detection, rate limiting, brute-force protection, audit logging, strong secret management, or full DTO sanitization. It also lacks the server-side election visibility enforcement I would want before trusting the vote workflow completely. These are not cosmetic improvements; they are real trust-boundary improvements. If asked in an interview, I should frame them as the next stage of hardening.

### 44. How does the admin dashboard work internally?

The admin dashboard is a React page that calls the admin election APIs and shows tabbed management for elections and users. It builds an election creation payload, then uploads candidate images separately after receiving the created election and candidate IDs. That two-step flow exists because the metadata and binary image upload are handled differently. The dashboard also supports scheduling, starting, stopping, calculating results, and publishing results.

### 45. How does the user dashboard work internally?

The user dashboard loads active and completed elections for the current user, then individually calls the `has-voted` endpoint for active elections to build a vote status map. It uses a modal for vote casting, integrates the webcam, and disables the final vote action until a capture exists. It also surfaces camera-specific errors such as insecure context, permission denied, or busy device. That makes it one of the better-implemented frontend flows in the project.

### 46. Are there any performance issues in the current code?

Yes, there are some manageable but real inefficiencies. `getActiveElectionsForUser()` loads all active elections and filters them in memory instead of querying by geography in the database. The frontend user dashboard also makes per-election `has-voted` requests, which is an N+1 pattern over HTTP. These are not catastrophic at small scale, but they would need refinement for larger data volumes.

### 47. What issue exists in the image verification service around cleanup?

The service deletes uploaded multer files after successful detection and descriptor work, but if an exception happens before that cleanup line, those temp files may remain. So the service would benefit from a `finally`-style cleanup path around uploaded files. This is not a core logic bug, but it is an operational hygiene issue. It is the kind of thing that matters on long-running servers.

### 48. What is the current automated verification status of the frontend and backend?

The frontend production build was verified successfully on April 21, 2026 using `npm run build`. The backend test suite was run with `./mvnw test`, and the build reached test execution but failed because the Spring context could not resolve `app.cors.allowed-origins` from test properties. So the current state is: frontend build healthy, backend compile healthy, backend tests failing due to incomplete test config. This is exactly the kind of status snapshot I should know before discussing the project.

### 49. If you had to improve only three things before calling this project "much stronger," what would they be?

First, I would fix server-side election authorization so every election-related user endpoint enforces eligibility. Second, I would replace raw entity responses with DTOs to stop accidental PII exposure. Third, I would add a real automated test suite covering auth, registration verification, vote casting, and result publication. Those three changes would dramatically improve both trustworthiness and maintainability.

### 50. How would you describe what you learned from this project?

This project taught me that real full-stack engineering is about more than feature coding. I had to think about auth, domain rules, biometric verification, image handling, deployment, HTTPS, container health, documentation drift, and testability. It also taught me to be honest about gaps: a system can be strong in architecture and still need important hardening work. That is probably the best interview takeaway of the whole project.

## Final Internal Summary

This project is already a strong full-stack case study because it demonstrates:

- multi-service architecture
- role-based security
- identity verification
- vote integrity checks
- facial verification integration
- result computation
- containerized deployment
- real production-style debugging lessons

The most important remaining work is not cosmetic. It is:

- enforce user eligibility on all election-related endpoints
- confirm candidate/election consistency in vote casting
- move entity responses to DTOs
- add validation
- fix and expand tests
- reconcile docs and seed paths
- clean up configuration and secrets

If I remember only one sentence for interviews, it should be this:

> "I built a serious full-stack voting platform with authentication, verification, biometric vote checks, and containerized deployment, and I also know exactly where the current implementation still needs stronger server-side guarantees and production hardening."
