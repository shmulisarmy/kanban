def map_row(col_names: list[str], row: tuple, dont_log: bool = False) -> dict:
    res = {}
    for i in range(len(col_names)):
        res[col_names[i]] = row[i]
    if not dont_log:
        print(f"{res=}")
    return res
def map_rows(col_names, rows: list[tuple]) -> dict[int, dict]:
    res = {}
    id_index = col_names.index("id")
    for row in rows:
        res[row[id_index]] = map_row(col_names=col_names, row=row, dont_log=True)
    print(f"{res=}")
    return res
