"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { accountSchema } from "@/lib/validations";
import { updateAccount } from "@/lib/actions/auth";
import { OCCUPATION } from "@/constants/enums/member/occupation";
import { MEMBER_TYPE } from "@/constants/enums/member/member_type";
import { EVENT } from "@/constants/enums/event/event";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type AccountFormData = z.infer<typeof accountSchema>;

interface AccountFormProps {
  userData: {
    id: string;
    birthDate?: string | null;
    contactNumber?: string | null;
    address?: string | null;
    facebook?: string | null;
    occupation: string;
    firstDateAttended?: string | null;
    firstEvent?: string | null;
    memberType: string;
  };
}

const AccountForm = ({ userData }: AccountFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<AccountFormData>({
    resolver: zodResolver(accountSchema),
    defaultValues: {
      birthDate: userData.birthDate || "",
      contactNumber: userData.contactNumber || "",
      address: userData.address || "",
      facebook: userData.facebook || "",
      occupation: userData.occupation as typeof OCCUPATION[number],
      firstDateAttended: userData.firstDateAttended || "",
      firstEvent: (userData.firstEvent as typeof EVENT[number]) || undefined,
      memberType: userData.memberType as typeof MEMBER_TYPE[number],
    },
  });

  const onSubmit = async (data: AccountFormData) => {
    setIsLoading(true);
    try {
      const result = await updateAccount({
        userId: userData.id,
        ...data,
      });

      if (result.success) {
        toast.success("Account updated successfully!");        // Redirect back to account page after successful update
        setTimeout(() => {
          router.push("/dashboard/account");
        }, 1000);      } else {
        toast.error(result.error || "Failed to update account");
      }
    } catch (error) {
      toast.error("An error occurred while updating your account:" + error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 text-black">
      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
          <CardDescription>
            Update your personal details and contact information.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="birthDate">Birth Date</Label>
              <Input
                id="birthDate"
                type="date"
                {...register("birthDate")}
                className={errors.birthDate ? "border-red-500" : ""}
              />
              {errors.birthDate && (
                <p className="text-sm text-red-500 mt-1">{errors.birthDate.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="contactNumber">Contact Number</Label>
              <Input
                id="contactNumber"
                type="tel"
                placeholder="e.g., +63 912 345 6789"
                {...register("contactNumber")}
                className={errors.contactNumber ? "border-red-500" : ""}
              />
              {errors.contactNumber && (
                <p className="text-sm text-red-500 mt-1">{errors.contactNumber.message}</p>
              )}
            </div>
          </div>

          <div>
            <Label htmlFor="address">Address</Label>
            <Textarea
              id="address"
              placeholder="Enter your full address"
              {...register("address")}
              className={errors.address ? "border-red-500" : ""}
              rows={3}
            />
            {errors.address && (
              <p className="text-sm text-red-500 mt-1">{errors.address.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="facebook">Facebook Profile</Label>
            <Input
              id="facebook"
              type="text"
              placeholder="e.g., john.doe.123"
              {...register("facebook")}
              className={errors.facebook ? "border-red-500" : ""}
            />
            {errors.facebook && (
              <p className="text-sm text-red-500 mt-1">{errors.facebook.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="occupation">Occupation</Label>
            <Select
              value={watch("occupation")}
              onValueChange={(value) => setValue("occupation", value as typeof OCCUPATION[number])}
            >
              <SelectTrigger className={errors.occupation ? "border-red-500" : ""}>
                <SelectValue placeholder="Select your occupation" />
              </SelectTrigger>
              <SelectContent>
                {OCCUPATION.map((occupation) => (
                  <SelectItem key={occupation} value={occupation}>
                    {occupation}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.occupation && (
              <p className="text-sm text-red-500 mt-1">{errors.occupation.message}</p>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Church Information</CardTitle>
          <CardDescription>
            Information about your journey with Hills of Glory.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="firstDateAttended">First Date Attended</Label>
              <Input
                id="firstDateAttended"
                type="date"
                {...register("firstDateAttended")}
                className={errors.firstDateAttended ? "border-red-500" : ""}
              />
              {errors.firstDateAttended && (
                <p className="text-sm text-red-500 mt-1">{errors.firstDateAttended.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="firstEvent">First Event Attended</Label>
              <Select
                value={watch("firstEvent") || ""}
                onValueChange={(value) => setValue("firstEvent", value as typeof EVENT[number])}
              >
                <SelectTrigger className={errors.firstEvent ? "border-red-500" : ""}>
                  <SelectValue placeholder="Select the first event" />
                </SelectTrigger>
                <SelectContent>
                  {EVENT.map((event) => (
                    <SelectItem key={event} value={event}>
                      {event}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.firstEvent && (
                <p className="text-sm text-red-500 mt-1">{errors.firstEvent.message}</p>
              )}
            </div>
          </div>

          <div>
            <Label htmlFor="memberType">Member Type</Label>
            <Select
              value={watch("memberType")}
              onValueChange={(value) => setValue("memberType", value as typeof MEMBER_TYPE[number])}
            >
              <SelectTrigger className={errors.memberType ? "border-red-500" : ""}>
                <SelectValue placeholder="Select your member type" />
              </SelectTrigger>
              <SelectContent>
                {MEMBER_TYPE.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.memberType && (
              <p className="text-sm text-red-500 mt-1">{errors.memberType.message}</p>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button type="submit" disabled={isLoading} className="px-8">
          {isLoading ? "Updating..." : "Update Account"}
        </Button>
      </div>
    </form>
  );
};

export default AccountForm;