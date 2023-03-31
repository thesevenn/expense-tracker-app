type Options = {
	year?: string;
	month?: string;
};

export default function createQuery(options?: Options): string {
	let query =
		"SELECT * FROM records WHERE u_id=$1 ORDER BY added_at DESC OFFSET $2 ROWS FETCH NEXT $3 ROWS ONLY";
	if (options && options.month) {
		query =
			"SELECT * FROM records WHERE u_id=$1 AND EXTRACT(year FROM records.added_at)=$2 AND EXTRACT(month FROM records.added_at)=$3 ORDER BY added_at DESC OFFSET $4 ROWS FETCH NEXT $5 ROWS ONLY";
	}
	if (options && options.year && !options.month) {
		query =
			"SELECT * FROM records WHERE u_id=$1 AND EXTRACT(year FROM records.added_at)=$2 ORDER BY added_at DESC OFFSET $3 ROWS FETCH NEXT $4 ROWS ONLY";
	}
	return query;
}
