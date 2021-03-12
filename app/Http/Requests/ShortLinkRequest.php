<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ShortLinkRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'custom_shortlink' => 'unique:short_links,short_link|min:5|nullable',
            'redirect_url' => 'url|required',
            'end_date' => 'after:now',
            'commercial' => 'nullable'
        ];
    }
}
