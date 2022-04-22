# Software Engineering 2 Project at Politecnico di Milano 2021/2022

## Authors

- [Kinga Marek](https://github.com/Astenna) (*kingaanna.marek@mail.polimi.it*), *personal code:* 10844847
- [Józek Piechaczek](https://github.com/jozef-piechaczek) (*jozefpiotr.piechaczek@mail.polimi.it*), *personal code:* 10852281
- [Mariusz Wiśniewski](https://github.com/Nexer8) (*mariuszkrzysztof.wisniewski@mail.polimi.it*), *personal code:* 10843995

## What is DREAM?

Over 58 percent of rural Indian households rely on agriculture as their primary source of income, with 80 percent of them being smallholder farmers with less than 2 hectares of land. Furthermore, more than 20 percent of smallholder agricultural households live in poverty. Food consumption is anticipated to climb by 59 percent to 98 percent by 2050, according to the Harvard Business Review.

With climate change posing a serious danger to agriculture, a complete overhaul of the system that transports food from farmers to our tables is required. On the top of that, the coronavirus pandemic created a huge disruption in food supply chains, exposing the weak parts of small-scale farmers as well as the significance of constructing resilient food systems.

Telangana is India's 11th biggest state, having a land area of 122,077 km2 and a population of 35,193,978 people (data from 2011). The project's goal is to help Telangana’s government promote data-driven policy-making in the state by designing, developing, and demonstrating anticipatory governance models for food systems utilizing digital public goods and community-centric approaches

## Goals

1. Improve farmers performance by providing them with personalized suggestions.
2. Acquire, combine, and visualize data from external systems.
3. Facilitate performance assessment of the farmers.
4. Promote regular farms' visits by agronomists, depending on the type of problems they face.
5. Enable agronomists to exchange information with farmers.
6. Enable farmers to exchange their knowledge.

## Technology

Frontend:

- React + Redux
- Typescript
- Ant design

Backend:

- C# and .NET 6
- Entity Framework
- FluentValidation
- AutoMapper
- PostgreSQL

System tests:

- Python
- pytest
- Selenium Web Driver

## Getting started

This is an example of how you may give instructions on setting up your project locally. To get a local copy up and running follow these simple example steps. **DISCLAIMER: Full installation guide can be found in *DeliveryFolder/ITD1.pdf*.**

### Project Organization

    ├───.github
    │   └───workflows       <- Workflow files for GitHub Actions.
    ├───Assignments
    ├───ATD                 <- Acceptance Test Deliverable source files.
    ├───Code
    │   ├───Client          <- Client source code.
    │   ├───Server          <- Server source code.
    │   └───system_tests    <- System tests source code.
    ├───DD                  <- Design Document source files.
    ├───DeliveryFolder      <- Folder containing all the created documents.
    ├───ITD                 <- Implementation and Test Deliverable source files.
    ├───RASD                <- Requirements Analysis and Specifications Document source files.
    └───images              <- Images used in README.

### Prerequisites

- Docker Desktop

### Installation

Open a terminal in the *Code/* directory and run the command below.

```bash
docker-compose up -d --build
```

### Usage

The frontend docker container is configured to work on the port 1337.

## Demo

![DREAM Demo](images/dream_demo.gif)
