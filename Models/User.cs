﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Student_Management.Models
{
    public class User
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string Email { get; set; }

        public string FirebaseUserId { get; set; }




    }
}

