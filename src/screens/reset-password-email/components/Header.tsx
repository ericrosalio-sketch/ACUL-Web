import ULThemeLogo from "@/components/ULThemeLogo";
import ULThemeTitle from "@/components/ULThemeTitle";
import { translate } from "@/utils/helpers/localeTranslate";

import { useResetPasswordEmailManager } from "../hooks/useResetPasswordEmailManager";

function Header() {
  const { texts, data, locales } = useResetPasswordEmailManager();
  const titleText = texts?.title || locales.header.title;
  const logoAltText = texts?.logoAltText || locales.header.logoAlt;

  return (
    <>
      <ULThemeLogo altText={logoAltText}></ULThemeLogo>
      <div
        style={{ width: "80px", height: "80px", aspectRatio: "1/1" }}
        className="mx-auto"
      >
        <svg
          width="80"
          height="80"
          viewBox="0 0 80 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M57.0651 28.8587C60.747 28.8587 63.7318 25.874 63.7318 22.1921C63.7318 18.5102 60.747 15.5254 57.0651 15.5254C53.3832 15.5254 50.3984 18.5102 50.3984 22.1921C50.3984 25.874 53.3832 28.8587 57.0651 28.8587Z"
            fill="#F0D224"
          />
          <path
            d="M39.6576 30.4909C40.4982 30.576 41.1549 31.2863 41.1549 32.1494C41.1548 33.0124 40.4982 33.7228 39.6576 33.8079L39.4883 33.8161H14.8968L32.9616 49.7471L33.235 49.9668C33.8927 50.448 34.6895 50.7105 35.5104 50.7106C36.4487 50.7104 37.3557 50.3676 38.0592 49.7471L48.2708 40.7432C48.9611 40.1347 50.0139 40.1997 50.6227 40.8896C51.2309 41.5799 51.1645 42.6345 50.4746 43.2432L40.2647 52.2471C38.9522 53.4048 37.2607 54.0438 35.5104 54.0439C33.8699 54.0438 32.2819 53.4822 31.0085 52.4587L30.7578 52.2471L12.3333 35.9987V65.5592C12.3336 66.0005 12.6912 66.3582 13.1325 66.3584H57.8753C58.3166 66.3581 58.6743 66.0005 58.6745 65.5592V43.5312C58.6749 42.6111 59.4209 41.8646 60.3411 41.8646C61.2613 41.8646 62.0074 42.6111 62.0078 43.5312V65.5592C62.0076 67.8415 60.1575 69.6915 57.8753 69.6917H13.1325C10.8503 69.6915 9.00022 67.8415 9 65.5592V34.6152C9.00022 32.333 10.8503 30.483 13.1325 30.4827H39.4883L39.6576 30.4909Z"
            fill="#081754"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M67.6914 10.3086C68.4573 10.3089 69.1972 10.5744 69.7845 11.0557L70.0254 11.2754L70.2451 11.5179C70.7263 12.1054 70.9938 12.8449 70.9938 13.611V29.9668L70.9775 30.2939C70.9022 31.0494 70.5669 31.7608 70.0254 32.3024C69.4064 32.921 68.5665 33.2689 67.6914 33.2692H56.7979L50.6992 37.8428C50.1947 38.221 49.5187 38.2821 48.9544 38.0007C48.3902 37.7185 48.0337 37.1406 48.0332 36.5098V33.2692H46.4284C45.553 33.2692 44.712 32.9212 44.0928 32.3024C43.5513 31.7609 43.2176 31.0493 43.1423 30.2939L43.126 29.9668V13.611C43.126 12.7352 43.4735 11.8947 44.0928 11.2754L44.3353 11.0557C44.9228 10.5744 45.6622 10.3086 46.4284 10.3086H67.6914ZM46.4593 29.9359H49.6999C50.6198 29.9365 51.3665 30.6825 51.3665 31.6025V33.1748L55.2419 30.2695L55.4697 30.1263C55.7067 30.0024 55.9712 29.936 56.2412 29.9359H67.6605V13.6419H46.4593V29.9359Z"
            fill="#081754"
          />
        </svg>
      </div>
      <ULThemeTitle className="m-0 font-semibold leading-[130%]">
        {titleText}
      </ULThemeTitle>
      <div
        className="text-(--coppel-color-text-dark) justify-text-header text-(length:--ul-theme-font-subtitle-size) font-subtitle w-[341px] m-0"
        style={{
          borderRadius: "var(--icon-16, 16px)",
          background: "var(--Colores-Background-background-0, #F3F3F3)",
          display: "flex",
          padding: "24px",
          justifyContent: "center",
          alignItems: "center",
          gap: "10px",
          alignSelf: "stretch",
        }}
      >
        <ul className="list-disc pl-5 m-0 text-left">
          <li className="mb-1">
            {translate(
              "header.descriptionList1",
              { email: "|||EMAIL|||" },
              locales
            )
              .split("|||EMAIL|||")
              .map((part, i, arr) => (
                <span key={i}>
                  {part}
                  {i < arr.length - 1 && (
                    <strong>{data?.username || ""}</strong>
                  )}
                </span>
              ))}
          </li>
          <li className="mb-1">
            {translate("header.descriptionList2", {}, locales)}
          </li>
          <li className="mb-0">
            {translate("header.descriptionList3", {}, locales)}
          </li>
        </ul>
      </div>
    </>
  );
}

export default Header;
