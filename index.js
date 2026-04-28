### Step 2: Install Dependencies
This installs all required libraries, including `scapy` for deep packet inspection and `requests` for web checks.
### Step 3: Configure the Agent
**Crucial Step:** Open `tizian_agent.py` and replace the placeholder API key:
*(Note: For fully local operation, you would replace `ChatOpenAI` with `Ollama` or `LlamaCpp` implementations.)*

### Step 4: Run the System
The provided shell script automates the setup, installation check, and execution flow, giving you a true "Red Hat Hacker" command-line experience.
### 🎯 Usage & Mission Briefing
When you run the script, Tizian will automatically execute the predefined mission in `tizian_agent.py`.

**To set a custom mission:** Edit the `mission` variable inside `tizian_agent.py` and rerun the script.

---

## 🧱 File Structure Overview

| File | Role | Description |
| :--- | :--- | :--- |
| `tizian_agent.py` | **The Brain** | Contains the LLM initialization, the Tizian persona prompt, and the Agent Executor logic. |
| `agent_tools.py` | **The Toolbox** | Houses the concrete, executable functions for hacking (Port Scan, SSH, Web Scan). |
| `run_tizian.sh` | **The Launcher** | The Bash script that manages environment setup, dependency installation, and execution. |
| `requirements.txt` | **The Manifest** | Lists all necessary Python libraries. |

## 🔮 Future Upgrades (The Next Level)

This foundation is robust. Potential upgrades include:
*   **Forensics Module:** Integration with tools like Volatility.
*   **Social Engineering Toolkit:** Modules for creating phishing templates.
*   **Real-Time Monitoring:** Streaming outputs from tools like `scapy`.