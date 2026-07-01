package com.myApp.repository;

import com.myApp.model.Address;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AddressRepositry extends JpaRepository<Address, Long> {


}
