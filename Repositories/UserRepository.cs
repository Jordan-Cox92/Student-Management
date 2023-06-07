using Student_Management.Models;
using Microsoft.Extensions.Configuration;
using Student_Management.Utils;
using Student_Management.Repositories;


namespace Student_Management.Repositories
{
    public class UserRepository : BaseRepository, IUserRepository
    {
        public UserRepository(IConfiguration configuration) : base(configuration) { }

        public User GetByFirebaseUserId(string firebaseUserId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT u.Id, u.Name, u.Email, u.FirebaseUserId
                          FROM [User] u
                         WHERE FirebaseUserId = @FirebaseuserId";

                    DbUtils.AddParameter(cmd, "@FirebaseUserId", firebaseUserId);

                    User user = null;

                    var reader = cmd.ExecuteReader();
                    if (reader.Read())
                    {
                        user = new User()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Name = DbUtils.GetString(reader, "Name"),
                            Email = DbUtils.GetString(reader, "Email"),
                            FirebaseUserId = DbUtils.GetString(reader, "FirebaseUserId"),
                        };
                    }
                    reader.Close();

                    return user;
                }
            }
        }


        public void Add(User user)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO User (Name, Email, FirebaseUserId)
                                        OUTPUT INSERTED.ID
                                        VALUES (@Name @Email, @FirebaseUserId)";
                    DbUtils.AddParameter(cmd, "@FirebaseUserId", user.FirebaseUserId);
                    DbUtils.AddParameter(cmd, "@Name", user.Name);
                    DbUtils.AddParameter(cmd, "@Email", user.Email);
                    user.Id = (int)cmd.ExecuteScalar();


                }
            }
        }
    }
}
