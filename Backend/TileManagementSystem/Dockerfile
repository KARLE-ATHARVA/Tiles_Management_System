# Use official .NET 8 SDK image
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 8080

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copy .csproj and restore dependencies
COPY *.sln .
COPY TileManagementSystem/*.csproj ./TileManagementSystem/
RUN dotnet restore

# Copy all files and build
COPY . .
WORKDIR /src/TileManagementSystem
RUN dotnet publish -c Release -o /app/publish

# Final image
FROM base AS final
WORKDIR /app
COPY --from=build /app/publish .
ENTRYPOINT ["dotnet", "TileManagementSystem.dll"]
