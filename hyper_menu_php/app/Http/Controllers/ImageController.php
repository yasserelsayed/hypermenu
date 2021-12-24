<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ImageController extends Controller
{
    public function store(Request $request)
    {
        $attr = $request->validate([
            'image' => 'required|image:jpeg,png,jpg,gif,svg|max:2048'
        ]);
        
        $image = $request->file('image');
        $image_uploaded_path =env("APP_SERVER_URL").'storage/app/'.$image->store("/public/images");
        return  $image_uploaded_path ;
    }
}
