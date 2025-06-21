# Use the official .NET SDK image
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /app

# Copy solution and project files
COPY Backend/TileManagementSystem/TileManagementSystem.csproj ./TileManagementSystem/
WORKDIR /app/TileManagementSystem
RUN dotnet restore

# Copy the rest of the source code
WORKDIR /app
COPY Backend/TileManagementSystem/. ./TileManagementSystem/

# Build the app
WORKDIR /app/TileManagementSystem
RUN dotnet publish -c Release -o out

# Runtime image
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=build /app/TileManagementSystem/out .

# Expose port and run
EXPOSE 8080
ENTRYPOINT ["dotnet", "TileManagementSystem.dll"]
