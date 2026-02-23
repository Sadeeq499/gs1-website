      {/* Registration Stepper with nested routes (Header only) */}
      <Route element={<RegistrationLayout />}>
        <Route path="/register" element={<RegistrationStepper />}>
          <Route index element={<AccountSetup />} />
          <Route path="account-setup" element={<AccountSetup />} />
          <Route path="company-information" element={<CompanyInfo />} />
          <Route
            path="individual-family-business"
            element={<IndividualFamilyBusinessRegistration />}
          />
          <Route path="document-upload" element={<DocumentUpload />} />
          <Route path="membership" element={<Membership />} />
          <Route path="review-and-pay" element={<ReviewAndPay />} />
        </Route>
        <Route path="/registration-success" element={<RegistrationSuccess />} />
      </Route>
