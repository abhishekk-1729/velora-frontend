# logger.py
import logging

def get_logger(module_name: str):
    """
    Creates and returns a logger with a custom configuration.
    
    Args:
        module_name (str): The name of the module where the logger is being used.

    Returns:
        logging.Logger: Configured logger for the given module.
    """
    # Configure the logger
    logger = logging.getLogger(module_name)
    logger.setLevel(logging.INFO)
    
    # Create console handler
    console_handler = logging.StreamHandler()
    
    # Create formatter and add it to the console handler
    formatter = logging.Formatter("%(asctime)s - %(name)s - %(levelname)s - Line: %(lineno)d - %(message)s")
    console_handler.setFormatter(formatter)
    
    # Add the console handler to the logger
    logger.addHandler(console_handler)
    
    return logger
