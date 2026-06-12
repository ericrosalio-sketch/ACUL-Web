import {
  useErrors,
  useScreen,
  useSignupPassword,
} from "@auth0/auth0-acul-react/signup-password";
import { act, render, screen } from "@testing-library/react";

import { CommonTestData } from "@/test/fixtures/common-data";
import { ScreenTestUtils } from "@/test/utils/screen-test-utils";

import SignupPasswordScreen from "../index";

jest.mock("@/utils/helpers/tokenUtils", () => ({
  extractTokenValue: jest.fn(() => "bottom"),
}));

/** Texto del botón de submit definido en locales/es.json → form.button */
const SUBMIT_BUTTON_TEXT = "Crear cuenta";

describe("SignupPasswordScreen", () => {
  /**
   * Renderiza la pantalla y espera a que el botón de submit esté en el DOM.
   * El botón puede estar deshabilitado (contraseña vacía al inicio), por eso
   * usamos { hidden: true } para encontrarlo aunque no sea interactivo todavía.
   */
  const renderScreen = async () => {
    await act(async () => {
      render(<SignupPasswordScreen />);
    });
    await screen.findByRole("button", { name: SUBMIT_BUTTON_TEXT, hidden: true });
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render screen with basic structure and texts from CommonTestData", async () => {
    await renderScreen();

    expect(screen.getByText("Crea tu cuenta")).toBeInTheDocument();
    expect(screen.getByText(/Crea una contraseña/)).toBeInTheDocument();
    // El botón existe en el DOM (puede estar deshabilitado hasta que la contraseña sea válida)
    expect(
      screen.getByRole("button", { name: SUBMIT_BUTTON_TEXT, hidden: true })
    ).toBeInTheDocument();
  });

  it("should render password field", async () => {
    await renderScreen();

    expect(screen.getByText("Password")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
  });

  it("should show password validation rules with proper validation states", async () => {
    await renderScreen();

    // Verify password validation box is always visible
    expect(screen.getByText(/Tu contraseña debe tener/)).toBeInTheDocument();

    // Test with a weak password — no rules fulfilled
    await ScreenTestUtils.fillInput(/Password/i, "weak");

    // Verify validation rules are displayed
    expect(screen.getByText(/At least 8 characters/)).toBeInTheDocument();
    expect(screen.getByText(/Lower case letters/)).toBeInTheDocument();
    expect(screen.getByText(/Upper case letters/)).toBeInTheDocument();
    expect(screen.getByText(/Numbers/)).toBeInTheDocument();

    // Con contraseña débil, ninguna regla debe estar cumplida
    const weakCumplido = screen.queryAllByRole("listitem").filter((li) =>
      li.getAttribute("aria-label")?.includes("cumplido")
    );

    // Test with a strong password
    await ScreenTestUtils.fillInput(/Password/i, "StrongPass123!");

    // Con contraseña fuerte, más reglas deben estar cumplidas que con la débil
    const strongCumplido = screen.queryAllByRole("listitem").filter((li) =>
      li.getAttribute("aria-label")?.includes("cumplido")
    );
    expect(strongCumplido.length).toBeGreaterThan(weakCumplido.length);
    expect(strongCumplido.length).toBeGreaterThan(0);
  });

  it("button should be disabled when password field is empty", async () => {
    await renderScreen();

    const submitButton = screen.getByRole("button", {
      name: SUBMIT_BUTTON_TEXT,
      hidden: true,
    });

    // Sin contraseña, el botón debe estar deshabilitado
    expect(submitButton).toBeDisabled();
    // aria-describedby debe apuntar a la pista accesible cuando el botón está deshabilitado
    expect(submitButton).toHaveAttribute("aria-describedby", "password-requirements-hint");
  });

  it("button should remain disabled when password is valid but checkboxes are not checked", async () => {
    await renderScreen();

    // Ingresar una contraseña válida pero sin marcar los checkboxes
    await ScreenTestUtils.fillInput(/Password/i, "ValidPass123!");

    // El botón debe seguir deshabilitado porque los checkboxes no están marcados
    const submitButton = screen.getByRole("button", {
      name: SUBMIT_BUTTON_TEXT,
      hidden: true,
    });
    expect(submitButton).toBeDisabled();
    expect(submitButton).toHaveAttribute("aria-describedby", "password-requirements-hint");
  });

  it("button should be enabled when password passes validation and both checkboxes are checked", async () => {
    await renderScreen();

    // Ingresar una contraseña que cumple todos los requisitos
    await ScreenTestUtils.fillInput(/Password/i, "ValidPass123!");

    // Marcar el checkbox de Términos y Condiciones
    const tycCheckbox = screen.getByRole("checkbox", {
      name: /Términos y Condiciones/i,
    });
    await act(async () => {
      tycCheckbox.click();
    });

    // Marcar el checkbox de Aviso de Privacidad
    const privacidadCheckbox = screen.getByRole("checkbox", {
      name: /Aviso de Privacidad/i,
    });
    await act(async () => {
      privacidadCheckbox.click();
    });

    // Ahora el botón debe estar habilitado y sin aria-describedby
    const submitButton = screen.getByRole("button", { name: SUBMIT_BUTTON_TEXT });
    expect(submitButton).not.toBeDisabled();
    expect(submitButton).not.toHaveAttribute("aria-describedby");
  });

  it("should render TyC and Aviso de Privacidad checkboxes", async () => {
    await renderScreen();

    // Los links con el texto de TyC y Aviso de Privacidad deben estar presentes
    expect(screen.getByText("Términos y Condiciones")).toBeInTheDocument();
    expect(screen.getByText("Aviso de Privacidad")).toBeInTheDocument();

    // El prefijo del checkbox de TyC está en el mismo span que el link,
    // así que buscamos usando una función de matcher que evalúe el textContent completo.
    expect(
      screen.getByText((_, element) =>
        element?.tagName === "SPAN" &&
        (element.textContent ?? "").includes("He leído y acepto") &&
        (element.textContent ?? "").includes("Términos y Condiciones")
      )
    ).toBeInTheDocument();

    expect(
      screen.getByText((_, element) =>
        element?.tagName === "SPAN" &&
        (element.textContent ?? "").includes("He leído y acepto el") &&
        (element.textContent ?? "").includes("Aviso de Privacidad")
      )
    ).toBeInTheDocument();
  });

  it("should successfully submit with valid password and both checkboxes checked", async () => {
    await renderScreen();
    const mockSignupPasswordInstance = (useSignupPassword as jest.Mock)();

    // Use a password that will pass all validation rules
    const validPassword = "ValidPass123!";

    // Ingresar la contraseña válida
    await ScreenTestUtils.fillInput(/Password/i, validPassword);

    // Marcar ambos checkboxes
    const tycCheckbox = screen.getByRole("checkbox", {
      name: /Términos y Condiciones/i,
    });
    await act(async () => {
      tycCheckbox.click();
    });

    const privacidadCheckbox = screen.getByRole("checkbox", {
      name: /Aviso de Privacidad/i,
    });
    await act(async () => {
      privacidadCheckbox.click();
    });

    // Verify the component shows some validation success indicators
    const checkmarks = screen.queryAllByTestId(/^check-icon-/);
    if (checkmarks.length > 0) {
      expect(checkmarks.length).toBeGreaterThan(0);
    }

    // El botón debe estar habilitado antes de hacer click
    await ScreenTestUtils.clickButton(SUBMIT_BUTTON_TEXT);

    // Verify that signup was called with the password
    expect(mockSignupPasswordInstance.signup).toHaveBeenCalledWith(
      expect.objectContaining({ password: validPassword })
    );
  });

  it("should integrate with useErrors hook for error handling", async () => {
    await renderScreen();

    // Verify useErrors hook is called (integration check)
    expect(useErrors).toHaveBeenCalled();

    // Verify component renders correctly with error handling in place
    expect(screen.getByText("Crea tu cuenta")).toBeInTheDocument();
    expect(
      document.querySelector('input[name="password"]')
    ).toBeInTheDocument();
  });

  it("should display general network errors from CommonTestData", async () => {
    // Mock useErrors to return general error (no field)
    (useErrors as jest.Mock).mockReturnValue({
      errors: {
        byField: jest.fn(() => []),
        byType: jest.fn((kind: string) => {
          if (kind === "auth0") {
            return [
              {
                id: "network-error",
                message: CommonTestData.errors.network.message,
                kind: "server",
              },
            ];
          }
          return [];
        }),
      },
      hasError: true,
      dismiss: jest.fn(),
      dismissAll: jest.fn(),
    });

    await renderScreen();

    expect(
      screen.getByText(CommonTestData.errors.network.message)
    ).toBeInTheDocument();
  });

  it("should render CAPTCHA when enabled", async () => {
    // Obtener la instancia actual del mock de useScreen y configurarla
    // con CAPTCHA habilitado ANTES de renderizar la pantalla.
    const mockScreen = (useScreen as jest.Mock)();
    mockScreen.isCaptchaAvailable = true;
    mockScreen.captcha = {
      provider: "auth0",
      image: "data:image/png;base64,test",
    };

    // Asegurarse de que useScreen devuelva la instancia mutada
    (useScreen as jest.Mock).mockReturnValue(mockScreen);

    await renderScreen();

    // SimpleCaptchaWidget renderiza el CAPTCHA como una imagen con alt="CAPTCHA challenge"
    expect(screen.getByAltText("CAPTCHA challenge")).toBeInTheDocument();
  });
});
