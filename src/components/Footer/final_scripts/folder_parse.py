import os
import pandas as pd

def generate_excel_from_json_presence(folder_path, output_excel):
    # Define the range of JSON filenames (1 to 1800)
    json_files = [f"{i}.json" for i in range(1, 1801)]

    # Check presence of each file in the folder
    presence = ["Present" if file in os.listdir(folder_path) else "Absent" for file in json_files]

    # Create a DataFrame with the results
    df = pd.DataFrame({"File": json_files, "Status": presence})

    # Save DataFrame to Excel
    df.to_excel(output_excel, index=False, engine='openpyxl')

    print(f"Excel sheet saved as {output_excel}")

# Example usage
folder_path = "/Users/abhishekkumar/velora-frontend/vite-project/src/components/Footer/final_scripts/results3"  # Replace with your folder path
output_excel = "output4.xlsx"  # Replace with your desired output file name
generate_excel_from_json_presence(folder_path, output_excel)
