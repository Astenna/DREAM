FROM mcr.microsoft.com/dotnet/sdk:6.0 AS base
WORKDIR /app
EXPOSE 80

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY Dream.sln ./
COPY API/*.csproj ./API/
COPY BusinessLogic/*.csproj ./BusinessLogic/
COPY DataAccess/*.csproj ./DataAccess/
RUN dotnet restore

COPY . .
WORKDIR /src/DataAccess
RUN dotnet build  -c Release -o /app

WORKDIR /src/BusinessLogic
RUN dotnet build  -c Release -o /app

WORKDIR /src/API
RUN dotnet build -c Release -o /app

FROM build AS publish
RUN dotnet publish -c Release -o /app

FROM base AS final
WORKDIR /app
COPY --from=publish /app .
RUN dotnet dev-certs https -t
ENTRYPOINT ["dotnet", "API.dll"]