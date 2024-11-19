import polars as pl

# Load the CSV
df = pl.read_csv("dfa-networth-levels.csv")

# Select only the columns you want to keep: Date, Category, and Net worth
df_selected = df.select(["Date", "Category", "Net worth"])

melted_df = df_selected.pivot(
    index=["Date"],
    values=["Net worth"],
    on=["Category"],
)

melted_df.write_csv("levels.csv")
