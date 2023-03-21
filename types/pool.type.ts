export default interface PoolConfig {
	host: string;
	port: number;
	database: string;
	user: string;
	password: string;
	max?: number;
}
