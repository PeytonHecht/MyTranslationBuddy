#!/bin/bash

# MyTranslationBuddy Test Runner Script
# Make this executable: chmod +x run_tests.sh
# Usage: ./run_tests.sh [options]

set -e

PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$PROJECT_DIR"

echo "🧪 MyTranslationBuddy API Test Suite"
echo "===================================="
echo ""

# Default test type
TEST_TYPE=${1:-"all"}

case $TEST_TYPE in
    "all")
        echo "Running all tests..."
        pytest -v
        ;;
    "health")
        echo "Running health tests..."
        pytest tests/test_health.py -v
        ;;
    "cities")
        echo "Running cities tests..."
        pytest tests/test_cities.py -v
        ;;
    "tips")
        echo "Running tips tests..."
        pytest tests/test_tips.py -v
        ;;
    "integration")
        echo "Running integration tests..."
        pytest tests/test_integration.py -v
        ;;
    "coverage")
        echo "Running tests with coverage report..."
        pytest --cov=app tests/ --cov-report=html
        echo "Coverage report generated in htmlcov/index.html"
        ;;
    "quick")
        echo "Running quick test subset..."
        pytest -v -k "success"
        ;;
    "watch")
        echo "Running tests in watch mode (requires pytest-watch)..."
        ptw
        ;;
    "help"|"-h"|"--help")
        echo "Usage: $0 [option]"
        echo ""
        echo "Options:"
        echo "  all           Run all tests (default)"
        echo "  health        Run health check tests"
        echo "  cities        Run cities endpoint tests"
        echo "  tips          Run tips endpoint tests"
        echo "  integration   Run integration tests"
        echo "  coverage      Run tests with coverage report"
        echo "  quick         Run quick success tests only"
        echo "  watch         Run tests in watch mode"
        echo "  help          Show this help message"
        echo ""
        ;;
    *)
        echo "Unknown option: $TEST_TYPE"
        echo "Use '$0 help' for usage information"
        exit 1
        ;;
esac

echo ""
echo "✅ Test run complete!"
