package com.swamy.service.impl;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import com.swamy.dto.UserDto;
import com.swamy.dto.UserRequest;
import com.swamy.dto.UserResponse;
import com.swamy.entity.User;
import com.swamy.exception.ResourceNotFoundException;
import com.swamy.exception.UserServiceBusinessException;
import com.swamy.props.AppProperties;
import com.swamy.repository.UserRepository;
import com.swamy.service.UserService;
import com.swamy.utils.AppConstants;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class UserServiceImpl implements UserService {

	private UserRepository userRepository;

	private ModelMapper modelMapper;

	private AppProperties appProperties;

	@Override
	public UserResponse saveUser(UserRequest userRequest) {

		User user = null;

		try {
			user = modelMapper.map(userRequest, User.class);

			user = userRepository.save(user);

		} catch (Exception e) {
			throw new UserServiceBusinessException(
					appProperties.getMessages().get(AppConstants.SAVE_USER_SERVICE_EXCEPTION));
		}

		return modelMapper.map(user, UserResponse.class);

	}

	@Override
	public List<UserResponse> getAllUsers() {

		List<UserResponse> response = null;

		try {
			List<User> usersList = userRepository.findAll();

			if (Collections.emptyList() != null) {
				response = usersList.stream().map(user -> modelMapper.map(user, UserResponse.class))
						.collect(Collectors.toList());
			}
		} catch (Exception e) {
			throw new UserServiceBusinessException(
					appProperties.getMessages().get(AppConstants.LIST_USERS_SERVICE_EXCEPTION));
		}

		return response;

	}

	@Override
	public UserResponse getUserById(Integer userId) {

		User user = userRepository.findById(userId).orElseThrow(() -> new ResourceNotFoundException(
				String.format(appProperties.getMessages().get(AppConstants.USER_NOT_FOUND), userId)));

		return modelMapper.map(user, UserResponse.class);
	}

	@Override
	public UserResponse updateUser(Integer userId, UserRequest userRequest) {

		User user = null;

		user = userRepository.findById(userId).orElseThrow(() -> new ResourceNotFoundException(
				String.format(appProperties.getMessages().get(AppConstants.USER_NOT_FOUND), userId)));

		try {

			user.setUsername(userRequest.getUsername());
			user.setEmail(userRequest.getEmail());
			user.setPassword(userRequest.getPassword());
			user.setDesignation(userRequest.getDesignation());
			user.setGender(userRequest.getGender());
			user.setBio(userRequest.getBio());
			user.setTerms(userRequest.getTerms());

			user = userRepository.save(user);

		} catch (Exception e) {
			throw new UserServiceBusinessException(
					appProperties.getMessages().get(AppConstants.UPDATE_USER_SERVICE_EXCEPTION));

		}

		return modelMapper.map(user, UserResponse.class);
	}

	@Override
	public String deleteUser(Integer userId) {

		User user = userRepository.findById(userId).orElseThrow(() -> new ResourceNotFoundException(
				String.format(appProperties.getMessages().get(AppConstants.USER_NOT_FOUND), userId)));

		try {
			if (user.getUserId().equals(userId)) {
				userRepository.deleteById(userId);
			}
		} catch (Exception e) {
			throw new UserServiceBusinessException(
					appProperties.getMessages().get(AppConstants.DELETE_USER_SERVICE_EXCEPTION));
		}

		return appProperties.getMessages().get(AppConstants.USER_DELETION_SUCCEEDED) + userId;
	}
}
