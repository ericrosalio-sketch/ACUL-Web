import { useForm } from "react-hook-form";

import { fireEvent, render, screen } from "@testing-library/react";

import { Form } from "@/components/ui/form";
import { ULThemeStaticPasswordField } from "@/components/form/ULThemeStaticPasswordField";

// Wrapper component that provides the react-hook-form + Form context required
// by ULThemeStaticLabelField (which internally calls useFormField).
function TestFormWrapper({ children }: { children: React.ReactNode }) {
  const form = useForm({
    defaultValues: {
      password: "",
    },
  });

  return <Form {...form}>{children}</Form>;
}

describe("ULThemeStaticPasswordField", () => {
  it("renders with a static label above the input and a toggle button", () => {
    render(
      <TestFormWrapper>
        <ULThemeStaticPasswordField
          label="Contraseña"
          name="password"
          placeholder="Ingresa tu contraseña"
        />
      </TestFormWrapper>
    );

    // The label should be visible as static text
    expect(screen.getByText("Contraseña")).toBeInTheDocument();

    // Input is accessible via its label
    const input = screen.getByLabelText("Contraseña");
    expect(input).toHaveAttribute("type", "password");

    // Toggle button must be present
    expect(
      screen.getByRole("button", { name: /show password/i })
    ).toBeInTheDocument();
  });

  it("toggles password visibility when the button is clicked", () => {
    render(
      <TestFormWrapper>
        <ULThemeStaticPasswordField
          label="Contraseña"
          name="password"
          placeholder="Ingresa tu contraseña"
        />
      </TestFormWrapper>
    );

    const input = screen.getByLabelText("Contraseña");
    const toggleButton = screen.getByRole("button", { name: /show password/i });

    // Initially hidden
    expect(input).toHaveAttribute("type", "password");

    // Show password
    fireEvent.click(toggleButton);
    expect(input).toHaveAttribute("type", "text");
    expect(
      screen.getByRole("button", { name: /hide password/i })
    ).toBeInTheDocument();

    // Hide password again
    fireEvent.click(screen.getByRole("button", { name: /hide password/i }));
    expect(input).toHaveAttribute("type", "password");
    expect(
      screen.getByRole("button", { name: /show password/i })
    ).toBeInTheDocument();
  });

  it("calls onVisibilityToggle callback with the new visibility state", () => {
    const handleVisibilityToggle = jest.fn();

    render(
      <TestFormWrapper>
        <ULThemeStaticPasswordField
          label="Contraseña"
          name="password"
          placeholder="Ingresa tu contraseña"
          onVisibilityToggle={handleVisibilityToggle}
        />
      </TestFormWrapper>
    );

    const toggleButton = screen.getByRole("button", { name: /show password/i });

    fireEvent.click(toggleButton);
    expect(handleVisibilityToggle).toHaveBeenCalledWith(true);

    fireEvent.click(screen.getByRole("button", { name: /hide password/i }));
    expect(handleVisibilityToggle).toHaveBeenCalledWith(false);
  });

  it("supports custom show/hide labels", () => {
    render(
      <TestFormWrapper>
        <ULThemeStaticPasswordField
          label="Contraseña"
          name="password"
          showLabel="Ver"
          hideLabel="Esconder"
        />
      </TestFormWrapper>
    );

    expect(screen.getByText("Ver")).toBeInTheDocument();

    fireEvent.click(screen.getByText("Ver"));
    expect(screen.getByText("Esconder")).toBeInTheDocument();
  });

  it("propagates standard input props (disabled, placeholder, etc.)", () => {
    render(
      <TestFormWrapper>
        <ULThemeStaticPasswordField
          label="Contraseña"
          name="password"
          placeholder="Ingresa tu contraseña"
          disabled
          data-testid="password-input"
        />
      </TestFormWrapper>
    );

    const input = screen.getByLabelText("Contraseña");
    expect(input).toBeDisabled();
    expect(input).toHaveAttribute("placeholder", "Ingresa tu contraseña");
  });

  it("applies error state styling when error prop is true", () => {
    render(
      <TestFormWrapper>
        <ULThemeStaticPasswordField
          label="Contraseña"
          name="password"
          error={true}
        />
      </TestFormWrapper>
    );

    const input = screen.getByLabelText("Contraseña");
    expect(input).toHaveAttribute("aria-invalid", "true");
  });
});
