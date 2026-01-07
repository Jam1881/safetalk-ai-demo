@echo off
title SafeTalk AI

echo ===============================
echo Starting SafeTalk AI...
echo ===============================

:: Check if Ollama is installed
where ollama >nul 2>nul
if %errorlevel% neq 0 (
  echo Ollama is not installed.
  echo Please install Ollama from https://ollama.com and run this again.
  pause
  exit /b
)

:: Check for llama3
ollama list | findstr /i "llama3" >nul
if %errorlevel% neq 0 (
  echo llama3 model not found.
  echo Downloading llama3...
  ollama pull llama3
)

:: Check for mistral
ollama list | findstr /i "mistral" >nul
if %errorlevel% neq 0 (
  echo mistral model not found.
  echo Downloading mistral...
  ollama pull mistral
)

:: Start server
echo Starting SafeTalk AI server...
start cmd /k node server.js

:: Wait briefly
timeout /t 3 >nul

:: Open browser
start http://localhost:3000

echo SafeTalk AI is running.
echo You may close this window if you wish.
