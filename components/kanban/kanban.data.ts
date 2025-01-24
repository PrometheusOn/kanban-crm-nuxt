import { EnumStatus } from "@/types/deals.types";
import type { Column } from "./kanban.types";

export const KANBAN_DATA: Column[] = [
	{
		id: EnumStatus.todo,
		name: 'Входящие',
		items: [],
	},
	{
		id: EnumStatus['to-be-agreed'],
		name: 'На согласовании',
		items: [],
	},
	{
		id: EnumStatus['in-progress'],
		name: 'В производстве',
		items: [],
	},
	{
		id: EnumStatus.produced,
		name: 'Произведено',
		items: [],
	},
	{
		id: EnumStatus.done,
		name: 'К отгрузке',
		items: [],
	},
]