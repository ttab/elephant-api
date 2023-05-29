// Code generated by newsdoc rpc-conversion --package repository; DO NOT EDIT.

package repository

import (
	"github.com/ttab/newsdoc"
)

// DocumentFromRPC converts Document protobuf messages to NewsDoc structures.
func DocumentFromRPC(r *Document) newsdoc.Document {
	var n newsdoc.Document

	if r == nil {
		return n
	}

	n.UUID = r.Uuid
	n.Type = r.Type
	n.URI = r.Uri
	n.URL = r.Url
	n.Title = r.Title

	for _, b := range r.Content {
		if b == nil {
			continue
		}

		n.Content = append(n.Content, BlockFromRPC(b))
	}

	for _, b := range r.Meta {
		if b == nil {
			continue
		}

		n.Meta = append(n.Meta, BlockFromRPC(b))
	}

	for _, b := range r.Links {
		if b == nil {
			continue
		}

		n.Links = append(n.Links, BlockFromRPC(b))
	}

	n.Language = r.Language

	return n
}

// BlockFromRPC converts Block protobuf messages to NewsDoc structures.
func BlockFromRPC(r *Block) newsdoc.Block {
	var n newsdoc.Block

	if r == nil {
		return n
	}

	n.ID = r.Id
	n.UUID = r.Uuid
	n.URI = r.Uri
	n.URL = r.Url
	n.Type = r.Type
	n.Title = r.Title

	if r.Data != nil {
		n.Data = make(newsdoc.DataMap)

		for k, v := range r.Data {
			n.Data[k] = v
		}
	}

	n.Rel = r.Rel
	n.Role = r.Role
	n.Name = r.Name
	n.Value = r.Value
	n.Contenttype = r.Contenttype

	for _, b := range r.Links {
		if b == nil {
			continue
		}

		n.Links = append(n.Links, BlockFromRPC(b))
	}

	for _, b := range r.Content {
		if b == nil {
			continue
		}

		n.Content = append(n.Content, BlockFromRPC(b))
	}

	for _, b := range r.Meta {
		if b == nil {
			continue
		}

		n.Meta = append(n.Meta, BlockFromRPC(b))
	}

	return n
}

// DocumentToRPC converts Document protobuf messages to NewsDoc structures.
func DocumentToRPC(n newsdoc.Document) *Document {
	r := Document{}

	r.Uuid = n.UUID
	r.Type = n.Type
	r.Uri = n.URI
	r.Url = n.URL
	r.Title = n.Title

	for _, b := range n.Content {
		r.Content = append(r.Content, BlockToRPC(b))
	}

	for _, b := range n.Meta {
		r.Meta = append(r.Meta, BlockToRPC(b))
	}

	for _, b := range n.Links {
		r.Links = append(r.Links, BlockToRPC(b))
	}

	r.Language = n.Language

	return &r
}

// BlockToRPC converts Block protobuf messages to NewsDoc structures.
func BlockToRPC(n newsdoc.Block) *Block {
	r := Block{}

	r.Id = n.ID
	r.Uuid = n.UUID
	r.Uri = n.URI
	r.Url = n.URL
	r.Type = n.Type
	r.Title = n.Title

	if n.Data != nil {
		r.Data = make(map[string]string)

		for k, v := range r.Data {
			r.Data[k] = v
		}
	}

	r.Rel = n.Rel
	r.Role = n.Role
	r.Name = n.Name
	r.Value = n.Value
	r.Contenttype = n.Contenttype

	for _, b := range n.Links {
		r.Links = append(r.Links, BlockToRPC(b))
	}

	for _, b := range n.Content {
		r.Content = append(r.Content, BlockToRPC(b))
	}

	for _, b := range n.Meta {
		r.Meta = append(r.Meta, BlockToRPC(b))
	}

	return &r
}
