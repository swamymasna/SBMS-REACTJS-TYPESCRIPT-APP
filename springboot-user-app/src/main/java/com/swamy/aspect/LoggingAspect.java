package com.swamy.aspect;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.extern.slf4j.Slf4j;

@Component
@Aspect
@Slf4j
public class LoggingAspect {

	@Pointcut(value = "execution(* com.swamy.service.*.*(..))")
	public void pointcutForService() {

	}

	@Pointcut(value = "execution(* com.swamy.controller.*.*(..))")
	public void pointcutForController() {

	}

	@Around(value = "pointcutForService() || pointcutForController()")
	public Object loggingAdvice(ProceedingJoinPoint pjp) throws Throwable {

		String methodName = pjp.getSignature().getName();

		String className = pjp.getTarget().getClass().getName();

		Object[] args = pjp.getArgs();

		ObjectMapper mapper = new ObjectMapper();

		log.info("Invoked Method : " + className + " : " + methodName + "() " + "With Arguments : "
				+ mapper.writeValueAsString(args));

		Object object = pjp.proceed();

		log.info("Returning Back From : " + className + " : " + methodName + "() " + "With Response : "
				+ mapper.writeValueAsString(object));

		return object;
	}
}
