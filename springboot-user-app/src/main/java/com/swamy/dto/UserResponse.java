package com.swamy.dto;

import lombok.Data;

@Data
public class UserResponse {

	private Integer userId;
	private String username;
	private String email;
	private String password;
	private String designation;
	private String gender;
	private String bio;
	private Boolean terms;
}
