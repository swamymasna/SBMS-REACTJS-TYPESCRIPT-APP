package com.swamy.service;

import java.util.List;

import com.swamy.dto.UserRequest;
import com.swamy.dto.UserResponse;

public interface UserService {

	UserResponse saveUser(UserRequest userRequest);

	List<UserResponse> getAllUsers();

	UserResponse getUserById(Integer userId);

	UserResponse updateUser(Integer userId, UserRequest userRequest);

	String deleteUser(Integer userId);
}
