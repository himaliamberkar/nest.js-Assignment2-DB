import { Repository } from 'typeorm';

export class PaginationSearchSortService<T> {
  constructor(private readonly repository: Repository<T>) {}

  // Function to handle pagination, searching, and sorting
  async findAll(
    page: number = 1,
    limit: number = 10,
    search: string = '',
    sortField: string = 'id',
    sortOrder: 'ASC' | 'DESC' = 'ASC'
  ): Promise<{ data: T[]; total: number }> {
    const queryBuilder = this.repository.createQueryBuilder('entity');

    // Add search condition (assuming search should match string fields)
    if (search) {
      queryBuilder.where('entity.firstName LIKE :search OR entity.lastName LIKE :search OR entity.email LIKE :search', {
        search: `%${search}%`,
      });
    }

    // Add sorting
    queryBuilder.orderBy(`entity.${sortField}`, sortOrder);

    // Add pagination
    queryBuilder.skip((page - 1) * limit).take(limit);

    // Execute the query
    const [data, total] = await queryBuilder.getManyAndCount();

    return { data, total };
  }
}
