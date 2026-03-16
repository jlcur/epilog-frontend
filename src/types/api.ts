export type BaseEntity = {
	id: string;
	created_at: Date;
	updated_at: Date;
	parent_id: string;
	is_deleted: boolean;
};

export type User = {
	id: string;
	name: string;
	email: string;
	emailVerified: boolean;
	image?: string | null | undefined;
	createdAt: Date;
	updatedAt: Date;
	role?: string | undefined;
	banned: boolean | null;
	banReason?: string | null | undefined;
	banExpires?: Date | null | undefined;
};

export type Post = {
	id: string;
	title: string;
	content: string;
	created_at: Date;
	updated_at: Date;
	user_id: string;
	user_name?: string;
};

export type PaginatedResponse<T> = {
	data: T[];
	total: number;
	currentPage: number;
	totalPages: number;
};

export type Entity<T> = {
	[K in keyof T]: T[K];
} & BaseEntity;

export type Comment = Entity<{
	content: string;
	user_id: string | null;
	user_name?: string | null;
	replies?: Comment[];
}>;
