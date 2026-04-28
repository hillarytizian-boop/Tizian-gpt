#  Tizian GPT: The Cybernetic Hacker Agent

[![GitHub License](https://img.shields.io/github/license/YourUsername/TizianGPT?style=flat-square)](LICENSE)
[![Python Version](https://img.shields.io/github/python-version/YourUsername/TizianGPT?style=flat-square)](https://www.python.org/)
[![Agent Status](https://img.shields.io/github/badge/status/YourUsername/TizianGPT?style=flat-square)](https://github.com/YourUsername/TizianGPT)

Tizian GPT is a sophisticated, **Tool-Augmented Generation (TAG) Agent** designed to embody the persona of a master Red Hat Hacker. Unlike standard chatbots, Tizian doesn't just *talk* about hacking; it executes attacks by leveraging a suite of specialized Python tools (Port Scanning, Traffic Sniffing, Web Exploitation, etc.).

This agent provides an **actionable, cinematic approach** to cybersecurity problems.

##  How It Works (The Architecture)

Tizian is built around the LangChain framework and operates using the **Tool-Augmented Generation (TAG) Agent** pattern:

1.  **LLM Core (Tizian):** The AI (powered by CyberNeurova/WormGPT) acts as the strategist, deciding *what* attack to perform.
2.  **Toolset (`agent_tools.py`):** This holds the functions (the actual tools like `nmap_wrapper`, `scapy_sniffer`, etc.).
3.  **Agent Executor:** This is the orchestration layer. It allows the LLM to think, realize it needs data, call the appropriate tool function, receive the output, and then incorporate that output back into its next thought process—creating a powerful feedback loop.

## 🚀 Quick Start Guides (Deployment Methods)

### 🖥️ Desktop / Linux Installation (Standard Workflow)

1.  **Clone the Repository:**