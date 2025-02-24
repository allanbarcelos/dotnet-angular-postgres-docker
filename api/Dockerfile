# Use the official .NET SDK image to build the application
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Install the dotnet-ef tool globally
# RUN dotnet tool install --global dotnet-ef

# Add dotnet tools to PATH
ENV PATH="$PATH:/root/.dotnet/tools"

# Copy project files and restore dependencies
COPY *.csproj .
RUN dotnet restore

# Copy the rest of the source code and build the project
COPY . .
RUN dotnet publish -c Release -o /app/publish

# RUN dotnet ef database update

# Use the official .NET Runtime image to run the application
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app

# Copy the published files from the build stage
COPY --from=build /app/publish .

# Expose the port the application will use
EXPOSE 5123

# Set the command to run the application
# ENTRYPOINT ["dotnet", "api.dll"]
ENTRYPOINT ["sh", "-c", "dotnet api.dll"]
