export type BaseEntity = {
	id: string;
	created_at: Date;
	updated_at: Date;
	parent_id: string;
	is_deleted: boolean;
};

export type Entity<T> = {
	[K in keyof T]: T[K];
} & BaseEntity;

export type Comment = Entity<{
	content: string;
	replies?: Comment[];
}>;
