export class UserDao {
    async findById(id) {
      const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch user with id ${id}`);
      }
      return await response.json();
    }
  }