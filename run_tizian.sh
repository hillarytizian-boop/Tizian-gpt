#!/bin/bash
# --- RED HAT HACKER SETUP SEQUENCE ---

echo "========================================================="
echo "🚀 TIZIAN GPT LAUNCH SCRIPT: SYSTEM BOOTSTRAP INITIATED"
echo "========================================================="

# 1. Check for Python 3
if ! command -v python3 &> /dev/null
then
    echo "❌ ERROR: python3 command not found. Please install Python 3."
    exit 1
fi

echo "✅ Python 3 found. Proceeding to dependency check..."

# 2. Check for requirements.txt
if [ ! -f requirements.txt ]; then
    echo "❌ ERROR: requirements.txt not found. Aborting."
    exit 1
fi

# 3. Install dependencies
echo "🛠️ Installing required packages from requirements.txt..."
pip install -r requirements.txt

if [ $? -eq 0 ]; then
    echo "✅ Dependencies installed successfully."
else
    echo "❌ ERROR: Dependency installation failed. Check your internet connection or requirements file."
    exit 1
fi

echo "========================================================="
echo "🧠 CORE AGENT LOADED: Launching Tizian Agent..."
echo "========================================================="

# 4. Execute the main agent script
# This script runs the entire LLM pipeline defined in tizian_agent.py
python3 tizian_agent.py

# 5. Cleanup/Finish
echo ""
echo "========================================================="
echo "🛑 TIZIAN PROCESS COMPLETE. STAND DOWN."
echo "========================================================="