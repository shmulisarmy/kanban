


import db_interactions
import python_reactive




lists = python_reactive.Table()
lists.rows = list(db_interactions.list.get_all_lists().values())
lists_by_board = lists.index_on(lambda item: item['board_id'])



tasks = python_reactive.Table()
tasks.rows = list(db_interactions.task.get_all_tasks().values())
tasks_by_list = tasks.index_on(lambda item: item['list_id'])



