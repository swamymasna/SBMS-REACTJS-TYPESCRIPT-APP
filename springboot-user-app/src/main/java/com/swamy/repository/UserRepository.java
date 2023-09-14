package com.swamy.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.swamy.entity.User;

public interface UserRepository extends JpaRepository<User, Integer> {

}
