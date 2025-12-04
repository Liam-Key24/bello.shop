import { NextRequest, NextResponse } from "next/server";
import {
  customerAddressCreate,
  customerAddressUpdate,
  customerAddressDelete,
  customerDefaultAddressUpdate,
} from "@/lib/shopify/customer";
import { getServerAuth } from "@/lib/auth/server-auth";
import type { MailingAddressInput } from "@/lib/shopify/types";

/**
 * GET - List all customer addresses
 * POST - Create a new address
 * PUT - Update an existing address
 * DELETE - Delete an address
 * PATCH - Set default address
 */
export async function GET(req: NextRequest) {
  try {
    const auth = await getServerAuth();

    if (!auth.isAuthenticated || !auth.token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    return NextResponse.json({ message: "Use /api/shopify/customer to get addresses" });
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Failed to get addresses";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const auth = await getServerAuth();

    if (!auth.isAuthenticated || !auth.token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json().catch(() => ({}));
    const address: MailingAddressInput = {
      address1: body.address1,
      address2: body.address2,
      city: body.city,
      province: body.province,
      country: body.country || "United States",
      zip: body.zip,
      phone: body.phone,
      firstName: body.firstName,
      lastName: body.lastName,
    };

    // Validate required fields
    if (!address.address1 || !address.city || !address.country || !address.zip) {
      return NextResponse.json(
        { error: "Missing required fields: address1, city, country, zip" },
        { status: 400 }
      );
    }

    const result = await customerAddressCreate(auth.token, address);

    if (result.customerUserErrors?.length > 0) {
      return NextResponse.json(
        { error: result.customerUserErrors[0].message },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      address: result.customerAddress,
    });
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Failed to create address";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const auth = await getServerAuth();

    if (!auth.isAuthenticated || !auth.token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json().catch(() => ({}));
    const addressId = body.id;

    if (!addressId) {
      return NextResponse.json({ error: "Address ID is required" }, { status: 400 });
    }

    const address: MailingAddressInput = {
      address1: body.address1,
      address2: body.address2,
      city: body.city,
      province: body.province,
      country: body.country || "United States",
      zip: body.zip,
      phone: body.phone,
      firstName: body.firstName,
      lastName: body.lastName,
    };

    // Validate required fields
    if (!address.address1 || !address.city || !address.country || !address.zip) {
      return NextResponse.json(
        { error: "Missing required fields: address1, city, country, zip" },
        { status: 400 }
      );
    }

    const result = await customerAddressUpdate(auth.token, addressId, address);

    if (result.customerUserErrors?.length > 0) {
      return NextResponse.json(
        { error: result.customerUserErrors[0].message },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      address: result.customerAddress,
    });
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Failed to update address";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const auth = await getServerAuth();

    if (!auth.isAuthenticated || !auth.token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const addressId = searchParams.get("id");

    if (!addressId) {
      return NextResponse.json({ error: "Address ID is required" }, { status: 400 });
    }

    const result = await customerAddressDelete(auth.token, addressId);

    if (result.customerUserErrors?.length > 0) {
      return NextResponse.json(
        { error: result.customerUserErrors[0].message },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      deletedAddressId: result.deletedCustomerAddressId,
    });
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Failed to delete address";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const auth = await getServerAuth();

    if (!auth.isAuthenticated || !auth.token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json().catch(() => ({}));
    const addressId = body.addressId;

    if (!addressId) {
      return NextResponse.json({ error: "Address ID is required" }, { status: 400 });
    }

    const result = await customerDefaultAddressUpdate(auth.token, addressId);

    if (result.customerUserErrors?.length > 0) {
      return NextResponse.json(
        { error: result.customerUserErrors[0].message },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      customer: result.customer,
    });
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Failed to set default address";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

