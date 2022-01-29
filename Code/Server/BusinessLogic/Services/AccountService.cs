﻿using AutoMapper;
using BusinessLogic.Dtos.Account;
using BusinessLogic.Exceptions;
using BusinessLogic.Tools;
using DataAccess;
using DataAccess.Entites.Actors;
using DataAccess.Entites.Farms;
using DataAccess.Entities.Actors;
using System.Security.Authentication;
using System.Security.Cryptography;

namespace BusinessLogic.Services
{
    public class AccountService : IAccountService
    {
        private readonly DreamDbContext _dreamDbContext;
        private readonly ITokenProvider _tokenProvider;
        private readonly IMapper _mapper;

        private static readonly int HashSaltSize = 80;
        private static readonly int HashIterationsCount = 10000;

        public AccountService(DreamDbContext dreamDbContext,
            ITokenProvider tokenProvider,
            IMapper mapper)
        {
            _dreamDbContext = dreamDbContext;
            _tokenProvider = tokenProvider;
            _mapper = mapper;
        }

        public async Task RegisterFarmerAsync(RegisterFarmerDto registerDto)
        {
            var domainAccount = GetDomainUserAccount(registerDto);
            domainAccount.Role = Role.Farmer;
            var farmDomain = _mapper.Map<Farm>(registerDto);
            var farmerDomainAccount = _mapper.Map<Farmer>(registerDto);
            farmerDomainAccount.Farm = farmDomain;
            farmerDomainAccount.User = domainAccount;

            await _dreamDbContext.Farmers.AddAsync(farmerDomainAccount);
            await _dreamDbContext.SaveChangesAsync();

            return;
        }

        public /*async*/ Task RegisterAgronomistAsync(RegisterAgronomistDto registerAgronomistDto)
        {
            throw new NotImplementedException();
        }

        public async Task RegisterPolicyMakerAsync(RegisterPolicyMakerDto registerPolicyMakerDto)
        {
            var domainAccount = GetDomainUserAccount(registerPolicyMakerDto);
            domainAccount.Role = Role.PolicyMaker;
            var policyMakerDomainAccount = _mapper.Map<PolicyMaker>(registerPolicyMakerDto);
            policyMakerDomainAccount.User = domainAccount;

            await _dreamDbContext.PolicyMakers.AddAsync(policyMakerDomainAccount);
            await _dreamDbContext.SaveChangesAsync();
        }

        private User GetDomainUserAccount(RegisterDto registerDto)
        {
            if (IsEmailAlreadyInUse(registerDto.Email))
            {
                throw new ApiException($"Email: {registerDto.Email} already in use!");
            }

            var salt = RandomNumberGenerator.GetBytes(HashSaltSize);
            var hashedPassword = CreatePasswordHash(registerDto.Password, salt);

            var domainAccount = _mapper.Map<User>(registerDto);
            domainAccount.PasswordHash = hashedPassword;
            domainAccount.Salt = salt;

            return domainAccount;
        }

        public TokenDto Login(LoginDto loginDto)
        {
            var user = _dreamDbContext.Users.SingleOrDefault(x => x.Email.Equals(loginDto.Email));

            if (user is null)
            {
                throw new ApiException($"User with email: {loginDto.Email} doesn't exist!");
            }

            if (AreLoginCredentialsValid(loginDto.Password, user))
            {
                return new TokenDto
                {
                    AccessToken = _tokenProvider.CreateToken(user)
                };
            }

            throw new AuthenticationException();
        }

        public /*async*/ Task ResetPasswordAsync(int id, LoginDto loginDto)
        {
            throw new NotImplementedException();
        }

        public /*async*/ Task DeleteAccountAsync(int id, LoginDto loginDto)
        {
            throw new NotImplementedException();
        }

        private bool AreLoginCredentialsValid(string password, User user)
        {
            var givenPasswordHash = CreatePasswordHash(password, user.Salt);
            for (var i = 0; i < user.PasswordHash.Length; i++)
            {
                if (user.PasswordHash[i] != givenPasswordHash[i])
                {
                    return false;
                }
            }

            return true;
        }

        private bool IsEmailAlreadyInUse(string email)
        {
            return _dreamDbContext.Users.Any(x => x.Email.Equals(email));
        }

        private byte[] CreatePasswordHash(string password, byte[] salt)
        {
            var pbkdf2 = new Rfc2898DeriveBytes(password, salt, HashIterationsCount);
            var hashedPassword = pbkdf2.GetBytes(HashSaltSize);
            return hashedPassword;
        }
    }
}
