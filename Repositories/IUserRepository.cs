
using Student_Management.Models;

namespace Student_Management.Repositories
{
    public interface IUserRepository
    {
        User GetByFirebaseUserId(string firebaseUserId);
        void Add(User user);
    }
}
