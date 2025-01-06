import subprocess
import time
from threading import Thread
from logger import get_logger

# Create a logger instance
logger = get_logger("Running all the processes")


# Parameters
total_rows = 57  # Total rows from 2 to 1860
rows_per_process = 20  # Each process handles 20 rows
total_ports = 5  # Number of ports
processes_per_port = 1  # Number of processes per port
process_time = 20 * 60  # 20 minutes in seconds
process_gap = 20 * 60  # 20-second gap between processes

# Generate rows for processing (from 2 to 1860)
process_params = [(i, i + rows_per_process - 1) for i in range(2, total_rows + 1, rows_per_process)]

# Ports starting from 1991, creating 20 ports
ports = [9111 + i for i in range(total_ports)]

def run_process(param1, param2, port):
    """
    Run the script with the given parameters and port.
    Ensures the next process only starts after the previous one finishes.
    """
    debugger_address = f"127.0.0.1:{port}"
    try:
        logger.info(f"Starting process on port {port} with params {param1}-{param2}")
        subprocess.run(
            [
                "python3", "dataExtractGpt.py",
                "--debugger_address", debugger_address,
                "--start", str(param1),
                "--end", str(param2),
                "--subsheet", "Sheet1"
            ],
            check=True
        )
        logger.info(f"Process on port {port} with params {param1}-{param2} completed.")
    except subprocess.CalledProcessError as e:
        logger.error(f"Error occurred in process on port {port} with params {param1}-{param2}: {e}")

def schedule_port(port, tasks):
    """
    Schedule processes for a single port, ensuring sequential execution.
    """
    for param1, param2 in tasks:
        run_process(param1, param2, port)  # Run the process sequentially
        logger.info(f"Waiting for {process_gap / 60} minutes before starting next process on port {port}.")
        time.sleep(process_gap)  # Wait for 20 seconds before starting the next process

    logger.info(f"All processes for port {port} completed.")

def execute_all_processes():
    """
    Main function to execute the processes on all ports.
    Distributes tasks among ports and schedules them in parallel.
    """
    # Distribute tasks among ports
    tasks_per_port = [process_params[i::total_ports] for i in range(total_ports)]

    # Start scheduling threads for each port
    threads = []
    for i, port in enumerate(ports):
        t = Thread(target=schedule_port, args=(port, tasks_per_port[i]))
        threads.append(t)
        t.start()

    # Wait for all threads to complete
    for t in threads:
        t.join()

    logger.info("All processes completed.")


def main():
    """
    The main function to call the execution of all processes.
    """
    logger.info("Starting the execution of all processes.")
    execute_all_processes()


if __name__ == "__main__":
    main()