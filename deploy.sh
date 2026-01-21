#!/bin/bash

# SPDX-FileCopyrightText: 2025 wahl.chat
#
# SPDX-License-Identifier: PolyForm-Noncommercial-1.0.0

set -e

echo "🚀 Wahl Chat Frontend - Deployment Script"
echo "=========================================="
echo ""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if .env file exists
if [ ! -f .env ]; then
    echo -e "${RED}❌ Error: .env file not found${NC}"
    echo "Please create a .env file from .env.example"
    echo "Run: cp .env.example .env"
    exit 1
fi

echo "✅ .env file found"

# Check required environment variables
echo ""
echo "🔍 Checking required environment variables..."

REQUIRED_VARS=(
    "TRAEFIK_ROUTER_HOST"
    "TRAEFIK_PUBLIC_NETWORK"
    "NEXT_PUBLIC_API_URL"
    "NEXT_PUBLIC_FIREBASE_PROJECT_ID"
    "FIREBASE_CLIENT_EMAIL"
    "FIREBASE_PRIVATE_KEY"
)

MISSING_VARS=()

for var in "${REQUIRED_VARS[@]}"; do
    if ! grep -q "^${var}=" .env || grep -q "^${var}=your-" .env || grep -q "^${var}=$" .env; then
        MISSING_VARS+=("$var")
    fi
done

if [ ${#MISSING_VARS[@]} -ne 0 ]; then
    echo -e "${RED}❌ Missing or incomplete environment variables:${NC}"
    for var in "${MISSING_VARS[@]}"; do
        echo "   - $var"
    done
    echo ""
    echo "Please update your .env file with the correct values."
    echo "See GET_FIREBASE_CONFIG.md for Firebase configuration."
    exit 1
fi

echo "✅ All required environment variables are set"

# Check if Docker is running
echo ""
echo "🐳 Checking Docker..."
if ! docker info > /dev/null 2>&1; then
    echo -e "${RED}❌ Error: Docker is not running${NC}"
    exit 1
fi
echo "✅ Docker is running"

# Check if Traefik network exists
echo ""
echo "🌐 Checking Traefik network..."
NETWORK_NAME=$(grep TRAEFIK_PUBLIC_NETWORK .env | cut -d '=' -f2)
if ! docker network ls | grep -q "$NETWORK_NAME"; then
    echo -e "${YELLOW}⚠️  Traefik network '$NETWORK_NAME' not found${NC}"
    echo "Creating network..."
    docker network create "$NETWORK_NAME"
    echo "✅ Network created"
else
    echo "✅ Traefik network exists"
fi

# Check if backend is accessible
echo ""
echo "🔗 Checking backend API..."
BACKEND_URL=$(grep NEXT_PUBLIC_API_URL .env | cut -d '=' -f2)
if curl -s -o /dev/null -w "%{http_code}" "$BACKEND_URL" | grep -q "200\|301\|302"; then
    echo "✅ Backend API is accessible at $BACKEND_URL"
else
    echo -e "${YELLOW}⚠️  Warning: Backend API at $BACKEND_URL is not accessible${NC}"
    echo "Make sure the backend is running before proceeding."
    read -p "Continue anyway? (y/N) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

# Build and deploy
echo ""
echo "🏗️  Building Docker image..."
docker-compose build

echo ""
echo "🚀 Starting container..."
docker-compose up -d

echo ""
echo "⏳ Waiting for container to be ready..."
sleep 5

# Check if container is running
if docker-compose ps | grep -q "Up"; then
    echo -e "${GREEN}✅ Container is running!${NC}"
else
    echo -e "${RED}❌ Container failed to start${NC}"
    echo "Showing logs:"
    docker-compose logs --tail=50
    exit 1
fi

# Show status
echo ""
echo "📊 Container status:"
docker-compose ps

echo ""
echo "📝 Recent logs:"
docker-compose logs --tail=20

echo ""
echo -e "${GREEN}🎉 Deployment completed successfully!${NC}"
echo ""
echo "Your frontend is now accessible at:"
FRONTEND_URL=$(grep TRAEFIK_ROUTER_HOST .env | cut -d '=' -f2)
echo "   🌐 https://$FRONTEND_URL"
echo ""
echo "Useful commands:"
echo "   📝 View logs:        docker-compose logs -f wahl-chat-frontend"
echo "   🔄 Restart:          docker-compose restart wahl-chat-frontend"
echo "   🛑 Stop:             docker-compose down"
echo "   🔧 Rebuild:          docker-compose up -d --build"
echo ""

