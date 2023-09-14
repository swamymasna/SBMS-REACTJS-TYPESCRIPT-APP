package com.swamy.exception;

public class UserServiceBusinessException extends RuntimeException {

	private static final long serialVersionUID = 1L;

	public UserServiceBusinessException(String message) {
		super(message);
	}
}
