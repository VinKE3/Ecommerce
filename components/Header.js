import Link from "next/link";
import styled from "styled-components";
import Center from "@/components/Center";
import { useContext, useState, useEffect } from "react";
import { CartContext } from "@/components/CartContext";
import BarsIcon from "@/components/icons/Bars";
import SearchIcon from "@/components/icons/SearchIcon";

const StyledHeader = styled.header`
  background-color: #222;
  position: sticky;
  top: 0;
  z-index: 10;
`;
const Logo = styled(Link)`
  color: #fff;
  text-decoration: none;
  position: relative;
  z-index: 3;
`;
const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px 0;
`;
const StyledNav = styled.nav`
  ${(props) =>
    props.mobileNavActive
      ? `
    display: block;
  `
      : `
    display: none;
  `}
  gap: 15px;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 70px 20px 20px;
  background-color: #222;
  @media screen and (min-width: 768px) {
    display: flex;
    position: static;
    padding: 0;
  }
`;

const NavLink = styled(Link)`
  display: block;
  color: #aaa;
  text-decoration: none;
  min-width: 30px;
  padding: 10px 0;

  svg {
    height: 20px;
  }

  @media screen and (min-width: 768px) {
    padding: 0;
  }

  &:hover {
    color: white;
  }

  &__text {
    padding: 10px 0;
  }

  &__icon {
    display: inline-block;
    min-width: 20px;
    color: white;

    svg {
      width: 14px;
      height: 14px;
    }
  }
  &.active {
    color: white;
    font-weight: bold;
  }
`;
const NavButton = styled.button`
  background-color: transparent;
  width: 30px;
  height: 30px;
  border: 0;
  color: white;
  cursor: pointer;
  position: relative;
  z-index: 3;
  @media screen and (min-width: 768px) {
    display: none;
  }
`;
const SideIcons = styled.div`
  display: flex;
  align-items: center;
  a {
    display: inline-block;
    min-width: 20px;
    color: white;
    font-weight: bold;
    svg {
      width: 20px;
      height: 20px;
    }
  }
`;

export default function Header() {
  const { cartProducts } = useContext(CartContext);
  const [mobileNavActive, setMobileNavActive] = useState(false);
  const [activeLink, setActiveLink] = useState("");
  useEffect(() => {
    // Cambia el enlace activo cuando cambia la ruta
    setActiveLink(window.location.pathname.replace("/", ""));
  }, [cartProducts]);
  return (
    <StyledHeader>
      <Center>
        <Wrapper>
          <Logo href={"/"}>Ecommerce</Logo>
          <StyledNav mobileNavActive={mobileNavActive}>
            <NavLink
              onClick={() => setActiveLink("")}
              className={activeLink === "" ? "active" : ""}
              href={"/"}
            >
              Home
            </NavLink>
            <NavLink
              onClick={() => setActiveLink("products")}
              className={activeLink === "products" ? "active" : ""}
              href={"/products"}
            >
              All products
            </NavLink>
            <NavLink
              onClick={() => setActiveLink("categories")}
              className={activeLink === "categories" ? "active" : ""}
              href={"/categories"}
            >
              Categories
            </NavLink>
            <NavLink
              onClick={() => setActiveLink("account")}
              className={activeLink === "account" ? "active" : ""}
              href={"/account"}
            >
              Account
            </NavLink>
            <NavLink
              onClick={() => setActiveLink("cart")}
              className={activeLink === "cart" ? "active" : ""}
              href={"/cart"}
            >
              Cart ({cartProducts.length})
            </NavLink>
          </StyledNav>
          <SideIcons>
            <Link href={"/search"}>
              <SearchIcon />
            </Link>
            <NavButton onClick={() => setMobileNavActive((prev) => !prev)}>
              <BarsIcon />
            </NavButton>
          </SideIcons>
        </Wrapper>
      </Center>
    </StyledHeader>
  );
}
